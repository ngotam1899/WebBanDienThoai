import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import CategoryActions, { CategoryActionTypes } from "../actions/categories";
import { getAllCategories, getDetailCategory, addCategory, updateCategory, deleteCategory } from "../apis/categories";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllCategories, payload);
    const data = get(result, "data");
    yield put(CategoryActions.onGetListSuccess(data.categorys));
  } catch (error) {
    yield put(CategoryActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
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
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addCategory, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(CategoryActions.onCreateSuccess(data.category));
    yield put(CategoryActions.onGetList());
  } catch (error) {
    yield put(CategoryActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  console.log(payload)
  try {
    const result = yield call(updateCategory, payload.params, payload.id);
    const data = get(result, "data", {});
    console.log("data", data)
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailCategory, payload.id);
    yield put(CategoryActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(CategoryActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(CategoryActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteCategory, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(CategoryActions.onDeleteSuccess(data));
    yield put(CategoryActions.onGetList());
  } catch (error) {
    yield put(CategoryActions.onDeleteError(error));
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

export function* watchCreate() {
  yield takeEvery(CategoryActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(CategoryActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(CategoryActionTypes.DELETE, handleDelete);
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
