import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import UIActions from "../actions/ui";
import CategoryActions, { CategoryActionTypes } from "../actions/categories";
import { getAllCategories } from "../apis/categories";
import {getAllProducts} from "../apis/products";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    var test = []
    const result = yield call(getAllCategories, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onGetListSuccess(data.categorys));
  } catch (error) {
    yield put(CategoryActions.onGetListError(error));
  }
  yield put(UIActions.hideLoading());
}


/**
 *
 */

export function* watchGetList() {
  yield takeEvery(CategoryActionTypes.GET_LIST, handleGetList);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
