import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OrdersActions, { OrdersActionsTypes } from "../actions/order";
import ProductsActions from "../actions/products";
import { addOrder, sendConfirmEmail, confirmOrder, getDetailOrder, deleteOrder, getAllOrder } from "../apis/order";

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
    yield put(OrdersActions.onCreateAnOrderSuccess(data));
    const email = yield call(sendConfirmEmail, data.order._id);
    yield put(OrdersActions.onSendConfirmEmailSuccess(email.data));
    localStorage.removeItem("CART");
    yield put(ProductsActions.onClearCart())
    const listResult = yield call(orderHistory, data.order.user);
    yield put(OrdersActions.onGetHistoryOrderSuccess(listResult.data.orders));
  } catch (error) {
    yield put(OrdersActions.onCreateAnOrderError(error));
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

function* handleHistoryOrder({ payload}) {
  try {
    const result = yield call(orderHistory, payload);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onGetHistoryOrderSuccess(data.orders));
  } catch (error) {
    yield put(OrdersActions.onGetHistoryOrderSuccess(error));
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
function* handleDelete({ payload }) {
  try {
    const result = yield call(deleteOrder, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onDeleteSuccess(data));
    const listResult = yield call(orderHistory, payload.userId);
    yield put(OrdersActions.onGetHistoryOrderSuccess(listResult.data.orders));
  } catch (error) {
    console.log(error);
    yield put(OrdersActions.onDeleteError(error));
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
  yield takeEvery(OrdersActionsTypes.ADD_ORDER, handleCreate);
}
export function* watchConfirmOrder() {
  yield takeEvery(OrdersActionsTypes.CONFIRM_ORDER, handleConfirmOrder);
}
export function* watchReConfirm() {
  yield takeEvery(OrdersActionsTypes.SEND_CONFIRM_EMAIL, handleReConfirm);
}
export function* watchDelete() {
  yield takeEvery(OrdersActionsTypes.DISCARD_ORDER, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchConfirmOrder),
    fork(watchReConfirm),
    fork(watchDelete),
  ]);
}
