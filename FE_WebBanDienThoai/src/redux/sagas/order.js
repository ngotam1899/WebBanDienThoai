import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OrdersActions, { OrdersActionsTypes } from "../actions/order";
import ProductsActions from "../actions/products";
import { addOrder, sendConfirmEmail, confirmOrder, getDetailOrder, updateOrder, getAllOrder } from "../apis/order";
import io from 'socket.io-client';

function* handleGetList({payload}) {
  try {
    const result = yield call(getAllOrder, payload);
    const data = get(result, "data")
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onGetListSuccess(data.orders));
  } catch (error) {
    yield put(OrdersActions.onGetListError(error));
  }
}

function* handleGetDetail({id}) {
  try {
    const result = yield call(getDetailOrder, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onGetDetailSuccess(data.order));
  } catch (error) {
    yield put(OrdersActions.onGetDetailError(error));
  }
}

function* handleReConfirm({ payload }) {
  try {
    const result = yield call(sendConfirmEmail, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    if (data.message !== "success") throw data;
    yield put(OrdersActions.onSendConfirmEmailSuccess(data));
  } catch (error) {
    yield put(OrdersActions.onSendConfirmEmailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addOrder, payload);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(OrdersActions.onCreateSuccess(data));
    const email = yield call(sendConfirmEmail, data.order._id);
    yield put(OrdersActions.onSendConfirmEmailSuccess(email.data));
    localStorage.removeItem("CART");
    /*  */
    const socket = io('http://localhost:3000');
    socket.emit('order', { email, order: data.order._id });
    /*  */
    yield put(ProductsActions.onClearCart())
  } catch (error) {
    yield put(OrdersActions.onCreateError(error));
  }
}

function* handleConfirmOrder({ payload}) {
  try {
    const result = yield call(confirmOrder, payload);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onConfirmOrderSuccess(data));
  } catch (error) {
    yield put(OrdersActions.onConfirmOrderError(error));
  }
}

/**
 *
 * update
 */
/**
 *
 * delete
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateOrder, payload.id, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailOrder, payload.id);
    yield put(OrdersActions.onUpdateSuccess(get(detailResult, "data")));
  } catch (error) {
    yield put(OrdersActions.onUpdateError(error));
  }
}

/**
 *
 */
export function* watchGetList() {
  yield takeEvery(OrdersActionsTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(OrdersActionsTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(OrdersActionsTypes.CREATE, handleCreate);
}
export function* watchConfirmOrder() {
  yield takeEvery(OrdersActionsTypes.CONFIRM_ORDER, handleConfirmOrder);
}
export function* watchReConfirm() {
  yield takeEvery(OrdersActionsTypes.SEND_CONFIRM_EMAIL, handleReConfirm);
}
export function* watchUpdate() {
  yield takeEvery(OrdersActionsTypes.UPDATE, handleUpdate);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchConfirmOrder),
    fork(watchReConfirm),
    fork(watchUpdate),
  ]);
}
