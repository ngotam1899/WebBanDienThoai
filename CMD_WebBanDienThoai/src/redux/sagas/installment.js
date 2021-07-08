import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import InstallmentActions, { InstallmentActionTypes } from "../actions/installment";
import { getAllInstallments, getDetailInstallment, getSessionInstallment, addInstallment, updateInstallment, deleteInstallment } from "../apis/installment";
/* Notification */
import io from 'socket.io-client';
import NotificationActions from "../actions/notification";
const socket = io('http://localhost:3000');
/* Notification */

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllInstallments, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onGetListSuccess(data.installments, data.total));
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
    const result = yield call(addInstallment, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(InstallmentActions.onCreateSuccess(data.installment));
    yield put(InstallmentActions.onGetList(payload.params));
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
    yield put(InstallmentActions.onGetList(payload.params));
    /* Notification */
    if(payload.data.money){
      yield put(NotificationActions.onCreate({
        user: data.installment.user,
        type: 2,
        link: data.installment._id,
        name : `Phiếu trả góp ${data.installment._id} vừa được thanh toán`,
        image : detailResult.data.installment.product._id.bigimage._id,
        content :  `${data.installment._id} đã được thanh toán tại cửa hàng với số tiền là ${payload.data.money}`
      }))
    }
    else if(data.installment.status > -1){
      socket.emit('installmentChangeStatus', { status: 0, user: data.installment.user.toString(), installment: data.installment._id });
      yield put(NotificationActions.onCreate({
        user: data.installment.user,
        type: 2,
        link: data.installment._id,
        name : `Phiếu trả góp ${data.installment._id} vừa được duyệt`,
        image : detailResult.data.installment.product._id.bigimage._id,
        content :  `${data.installment._id} đã được duyệt thành công. Vui lòng kiểm tra thông tin trong Trang trả góp của bạn`
      }))
    }
  /* Notification */
  } catch (error) {
    yield put(InstallmentActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteInstallment, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onDeleteSuccess(data));
    yield put(InstallmentActions.onGetList(params));
  } catch (error) {
    yield put(InstallmentActions.onDeleteError(error));
  }
}

function* handleGetSession({ payload }) {
  try {
    const result = yield call(getSessionInstallment, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onGetSessionSuccess(data.count));
  } catch (error) {
    yield put(InstallmentActions.onGetSessionError(error));
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
export function* watchGetSession() {
  yield takeEvery(InstallmentActionTypes.GET_SESSION, handleGetSession);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
    fork(watchGetSession)
  ]);
}
