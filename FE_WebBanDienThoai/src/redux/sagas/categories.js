import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import UIActions from "../actions/ui";
import CategoryActions, { CategoryActionTypes } from "../actions/categories";
import { getAllCategories, getDetailCategory } from "../apis/categories";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    const result = yield call(getAllCategories, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onGetListSuccess(data.categorys));
  } catch (error) {
    yield put(CategoryActions.onGetListError(error));
  }
  yield put(UIActions.hideLoading());
}

function* handleGetDetail({ id }) {
  try {
    const result = yield call(getDetailCategory, id);
    const data = get(result, "data", {});
    yield put(CategoryActions.onGetDetailSuccess(data.category));
  } catch (error) {
    yield put(CategoryActions.onGetDetailError(error));
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(CategoryActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(CategoryActionTypes.GET_DETAIL, handleGetDetail);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
  ]);
}
