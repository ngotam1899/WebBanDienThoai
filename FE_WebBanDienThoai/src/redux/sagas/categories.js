import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import UIActions from "../actions/ui";
import CategoryActions, { CategoryActionTypes } from "../actions/categories";
import { getAllCategories, getCategoriesByKeyword, getDetailCategory } from "../apis/categories";

function* handleGetListKeyword({ payload }) {
  yield put(UIActions.showLoading());
  try {
    const result = yield call(getCategoriesByKeyword, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onGetListKeywordSuccess(data.categories));
  } catch (error) {
    yield put(CategoryActions.onGetListKeywordError(error));
  }
  yield put(UIActions.hideLoading());
}

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllCategories, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onGetListSuccess(data.categorys));
  } catch (error) {
    yield put(CategoryActions.onGetListError(error));
  }
}

function* handleGetAccessory({ payload }) {
  try {
    const result = yield call(getAllCategories, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onGetAccessorySuccess(data.categorys));
  } catch (error) {
    yield put(CategoryActions.onGetAccessoryError(error));
  }
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

export function* watchGetListKeyword() {
  yield takeEvery(CategoryActionTypes.GET_LIST_KEYWORD, handleGetListKeyword);
}
export function* watchGetList() {
  yield takeEvery(CategoryActionTypes.GET_LIST, handleGetList);
}
export function* watchGetAccessory() {
  yield takeEvery(CategoryActionTypes.GET_ACCESSORY, handleGetAccessory);
}
export function* watchGetDetail() {
  yield takeEvery(CategoryActionTypes.GET_DETAIL, handleGetDetail);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetListKeyword),
    fork(watchGetList),
    fork(watchGetAccessory),
    fork(watchGetDetail),
  ]);
}
