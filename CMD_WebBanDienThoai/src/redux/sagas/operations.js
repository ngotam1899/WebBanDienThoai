import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OperationActions, { OperationActionTypes } from "../actions/operations";
import { getAllOperations, getDetailOperation, addOperation, updateOperation, deleteOperation } from "../apis/operations";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllOperations, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(OperationActions.onGetListSuccess(data.operations));
  } catch (error) {
    yield put(OperationActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailOperation, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OperationActions.onGetDetailSuccess(data.category));
  } catch (error) {
    yield put(OperationActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addOperation, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(OperationActions.onCreateSuccess(data.operation));
    yield put(OperationActions.onGetList());
  } catch (error) {
    yield put(OperationActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateOperation, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailOperation, payload.id);
    yield put(OperationActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(OperationActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(OperationActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteOperation, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OperationActions.onDeleteSuccess(data));
    yield put(OperationActions.onGetList());
  } catch (error) {
    yield put(OperationActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(OperationActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(OperationActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(OperationActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(OperationActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(OperationActionTypes.DELETE, handleDelete);
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
