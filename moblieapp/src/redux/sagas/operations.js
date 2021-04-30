import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OperationActions, { OperationActionTypes } from "../actions/operations";
import { getAllOperations } from "../apis/operations";

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

export function* watchGetList() {
  yield takeEvery(OperationActionTypes.GET_LIST, handleGetList);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
