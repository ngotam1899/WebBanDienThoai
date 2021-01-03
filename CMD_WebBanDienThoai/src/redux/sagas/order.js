import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OrderActions, { OrderActionTypes } from "../actions/order";
import { getAllOrders, getDetailOrder, updateOrder, deleteOrder, findOrders } from "../apis/order";

function* handleGetList({ payload }) {
  console.log(payload)
  try {
    if(payload.phone){
      console.log("1")
      const result = yield call(findOrders, payload);
      const data = get(result, "data");
      if (data.code !== 200) throw data;
      yield put(OrderActions.onGetListSuccess(data.order, data.total));
    }
    else {
      console.log("2")
      const result = yield call(getAllOrders, payload);
      const data = get(result, "data");
      if (data.code !== 200) throw data;
      yield put(OrderActions.onGetListSuccess(data.orders, data.total));
    }
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
    const result = yield call(updateOrder, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailOrder, payload.id);
    yield put(OrderActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(OrderActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(OrderActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteOrder, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrderActions.onDeleteSuccess(data));
    yield put(OrderActions.onGetList());
  } catch (error) {
    yield put(OrderActions.onDeleteError(error));
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

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
