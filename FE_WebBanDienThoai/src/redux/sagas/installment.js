import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import InstallmentActions, {
  InstallmentActionTypes,
} from "../actions/installment";
import {
  getAllInstallments,
  getDetailInstallment,
  addInstallment,
  updateInstallment,
  deleteInstallment,
} from "../apis/installment";
import { getUser } from "../apis/user";
/* Notification */
import io from "socket.io-client";
import NotificationActions from "../actions/notification";
const socket = io("https://be-phonestore.herokuapp.com");
/* Notification */

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllInstallments, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(
      InstallmentActions.onGetListSuccess(data.installments, data.total)
    );
  } catch (error) {
    yield put(InstallmentActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailInstallment, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onGetDetailSuccess(data.installment));
  } catch (error) {
    yield put(InstallmentActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addInstallment, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(InstallmentActions.onCreateSuccess(data.installment));
    yield put(InstallmentActions.onGetList());
    const userRes = yield call(getUser, payload.params.user);
    const instRes = yield call(getDetailInstallment, data.installment._id);
    /* Notification */
    socket.emit("installment", {
      email: userRes.data.user.email,
      installment: data.installment._id,
    });
    yield put(
      NotificationActions.onCreate({
        name: "Yêu cầu trả góp mới cần duyệt",
        image: instRes.data.installment.product._id.bigimage._id,
        link: data.installment._id,
        type: 2,
        content: `${userRes.data.user.email} vừa gửi yêu cầu trả góp cho sản phẩm`,
      })
    );
    /* Notification */
  } catch (error) {
    yield put(InstallmentActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateInstallment, payload.data, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailInstallment, payload.id);
    yield put(InstallmentActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(InstallmentActions.onGetList());
    const userRes = yield call(getUser, data.installment.user);
    // Thanh toán thành công thì báo về cho admin
    if (payload.data.money) {
      socket.emit("installmentMoney", {
        email: userRes.data.user.email,
        installment: data.installment._id,
      });
      yield put(
        NotificationActions.onCreate({
          type: 2,
          user: null,
          link: data.installment._id,
          name: `Phiếu trả góp ${data.installment._id} vừa được thanh toán`,
          image: detailResult.data.installment.product._id.bigimage._id,
          content: `${data.installment._id} đã được thanh toán tại cửa hàng với số tiền là ${payload.data.money} VND`,
        })
      );
    }
  } catch (error) {
    yield put(InstallmentActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteInstallment, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onDeleteSuccess(data));
    yield put(InstallmentActions.onGetList());
  } catch (error) {
    yield put(InstallmentActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(InstallmentActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(InstallmentActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(InstallmentActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(InstallmentActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(InstallmentActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
