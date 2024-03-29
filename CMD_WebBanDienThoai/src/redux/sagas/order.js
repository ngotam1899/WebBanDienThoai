import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OrderActions, { OrderActionTypes } from "../actions/order";
import { getAllOrders, getDetailOrder, updateOrder, deleteOrder, getRevenue, getRevenueList, getSessionOrder } from "../apis/order";
/* Notification */
import io from 'socket.io-client';
import NotificationActions from "../actions/notification";
const socket = io('https://be-phonestore.herokuapp.com');
/* Notification */

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllOrders, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(OrderActions.onGetListSuccess(data.orders, data.total));

  } catch (error) {
    yield put(OrderActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailOrder, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrderActions.onGetDetailSuccess(data.order));
  } catch (error) {
    yield put(OrderActions.onGetDetailError(error));
  }
}

function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateOrder, payload.data, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrderActions.onUpdateSuccess(data.order));
    yield put(OrderActions.onGetList(payload.params));
    /* Notification */
    if(payload.data.status === "0"){
      socket.emit('orderChangeStatus', { status: 0, user: data.order.user.toString(), order: data.order._id });
      yield put(NotificationActions.onCreate({
        user: data.order.user,
        type: 0,
        link: data.order._id,
        name : `Đơn hàng ${data.order._id} đang trong quá trình vận chuyển`,
        image : data.order.order_list[0].product.bigimage,
        content :  `${data.order._id} vừa nhập kho vận chuyển`
      }))
    }
    else if(payload.data.status === "1"){
      socket.emit('orderChangeStatus', { status: 1, user: data.order.user.toString(), order: data.order._id });
      yield put(NotificationActions.onCreate({
        user: data.order.user,
        type: 0,
        link: data.order._id,
        name : `Đơn hàng ${data.order._id} đã vận chuyển thành công`,
        image : data.order.order_list[0].product.bigimage,
        content : 'Chúng tôi vừa ghi nhận đơn hàng của bạn vừa vận chuyển thành công. Vui lòng kiểm tra đơn hàng và bổ dung đánh giá'
      }))
    }

  /* Notification */
  } catch (error) {
    yield put(OrderActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteOrder, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrderActions.onDeleteSuccess(data));
    yield put(OrderActions.onGetList(params));
  } catch (error) {
    yield put(OrderActions.onDeleteError(error));
  }
}

function* handleGetRevenue({ payload }) {
  try {
    const result = yield call(getRevenue, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(OrderActions.onGetRevenueSuccess(data.total_price));
  } catch (error) {
    yield put(OrderActions.onGetRevenueError(error));
  }
}

function* handleGetRevenueList({ payload }) {
  try {
    const result = yield call(getRevenueList, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(OrderActions.onGetRevenueListSuccess(data.result));
  } catch (error) {
    yield put(OrderActions.onGetRevenueListError(error));
  }
}

function* handleGetSession({ payload }) {
  try {
    const result = yield call(getSessionOrder, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(OrderActions.onGetSessionSuccess(data.count));
  } catch (error) {
    yield put(OrderActions.onGetSessionError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(OrderActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(OrderActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchUpdate() {
  yield takeEvery(OrderActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(OrderActionTypes.DELETE, handleDelete);
}
export function* watchGetRevenue() {
  yield takeEvery(OrderActionTypes.GET_REVENUE, handleGetRevenue);
}
export function* watchGetRevenueList() {
  yield takeEvery(OrderActionTypes.GET_REVENUE_LIST, handleGetRevenueList);
}
export function* watchGetSession() {
  yield takeEvery(OrderActionTypes.GET_SESSION, handleGetSession);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchUpdate),
    fork(watchDelete),
    fork(watchGetRevenue),
    fork(watchGetRevenueList),
    fork(watchGetSession),
  ]);
}
