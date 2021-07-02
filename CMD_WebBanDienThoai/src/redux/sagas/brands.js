import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import BrandActions, { BrandActionTypes } from "../actions/brands";
import { getAllBrands, getDetailBrand, addBrand, updateBrand, deleteBrand } from "../apis/brands";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllBrands, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetListSuccess(data.brands, data.total));
  } catch (error) {
    yield put(BrandActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailBrand, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetDetailSuccess(data.category));
  } catch (error) {
    yield put(BrandActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addBrand, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(BrandActions.onCreateSuccess(data.brand));
    yield put(BrandActions.onGetList(payload.params));
  } catch (error) {
    yield put(BrandActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateBrand, payload.data, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    var detailResult = yield call(getDetailBrand, payload.id);
    yield put(BrandActions.onUpdateSuccess(get(detailResult, "data.brand")));
    yield put(BrandActions.onGetList(payload.params));
  } catch (error) {
    yield put(BrandActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteBrand, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(BrandActions.onDeleteSuccess(data));
    yield put(BrandActions.onGetList(params));
  } catch (error) {
    yield put(BrandActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(BrandActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(BrandActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(BrandActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(BrandActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(BrandActionTypes.DELETE, handleDelete);
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
