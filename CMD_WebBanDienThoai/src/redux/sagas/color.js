import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ColorActions, { ColorActionTypes } from "../actions/color";
import { getAllColors, getDetailColor, addColor, updateColor, deleteColor } from "../apis/color";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllColors, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ColorActions.onGetListSuccess(data.colors));
  } catch (error) {
    yield put(ColorActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailColor, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ColorActions.onGetDetailSuccess(data.category));
  } catch (error) {
    yield put(ColorActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addColor, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(ColorActions.onCreateSuccess(data.color));
    yield put(ColorActions.onGetList());
  } catch (error) {
    yield put(ColorActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateColor, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailColor, payload.id);
    yield put(ColorActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(ColorActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(ColorActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteColor, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ColorActions.onDeleteSuccess(data));
    yield put(ColorActions.onGetList());
  } catch (error) {
    yield put(ColorActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ColorActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(ColorActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(ColorActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(ColorActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(ColorActionTypes.DELETE, handleDelete);
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
