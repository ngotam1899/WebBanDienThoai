import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import DisplayActions, { DisplayActionTypes } from "../actions/display";
import { getAllDisplays } from "../apis/products";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllDisplays, payload);
    const data = get(result, "data");
    yield put(DisplayActions.onGetListSuccess(data.displays.displays));
  } catch (error) {
    yield put(DisplayActions.onGetListError(error));
  }
}
export function* watchGetList() {
  yield takeEvery(DisplayActionTypes.GET_LIST, handleGetList);
}

/*
export function* watchCreate() {
  yield takeEvery(ProductsActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(ProductsActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
} */

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    /* fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete), */
  ]);
}
