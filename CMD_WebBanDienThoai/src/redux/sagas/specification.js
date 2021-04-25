import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import SpecificationActions, { SpecificationActionTypes } from "../actions/specification";
import { getAllSpecifications,  getDetailSpecification, addSpecification, updateSpecification, deleteSpecification } from "../apis/specification";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllSpecifications, payload);
    const data = get(result, "data");
    yield put(SpecificationActions.onGetListSuccess(data.specifications));
  } catch (error) {
    yield put(SpecificationActions.onGetListError(error));
  }
}


function* handleFilter({ payload }) {
  yield delay(2000);
  const { keyword } = payload;
  try {
    const result = yield call(getAllSpecifications, {keyword});
    const data = get(result, "data");
    yield put(SpecificationActions.onFilterSuccess(data.specifications));
  } catch (error) {
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailSpecification, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(SpecificationActions.onGetDetailSuccess(data.specification));
  } catch (error) {
    yield put(SpecificationActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addSpecification, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(SpecificationActions.onCreateSuccess(data.specification));
    yield put(SpecificationActions.onGetList());
  } catch (error) {
    yield put(SpecificationActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateSpecification, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailSpecification, payload.id);
    yield put(SpecificationActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(SpecificationActions.onGetList());
  } catch (error) {
    yield put(SpecificationActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteSpecification, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(SpecificationActions.onDeleteSuccess(data));
    yield put(SpecificationActions.onGetList());
  } catch (error) {
    yield put(SpecificationActions.onDeleteError(error));
  }
}

export function* watchGetDetail() {
  yield takeEvery(SpecificationActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(SpecificationActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(SpecificationActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(SpecificationActionTypes.DELETE, handleDelete);
}

export function* watchGetList() {
  yield takeEvery(SpecificationActionTypes.GET_LIST, handleGetList);
}

export function* watchFilter() {
  yield takeEvery(SpecificationActionTypes.FILTER, handleFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchFilter),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
