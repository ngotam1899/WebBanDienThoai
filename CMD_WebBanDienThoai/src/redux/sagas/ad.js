import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import AdActions, { AdActionTypes } from "../actions/ad";
import { getAllAds, getDetailAd, addAd, updateAd, deleteAd } from "../apis/ad";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllAds, payload);
    const data = get(result, "data");
    yield put(AdActions.onGetListSuccess(data.ads));
  } catch (error) {
    yield put(AdActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailAd, id);
    const data = get(result, "data", {});
    yield put(AdActions.onGetDetailSuccess(data.ad));
  } catch (error) {
    yield put(AdActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {

    const result = yield call(addAd, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(AdActions.onCreateSuccess(data.ad));
    yield put(AdActions.onGetList());
  } catch (error) {
    yield put(AdActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    console.log(payload.params)
    const result = yield call(updateAd, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    var detailResult = yield call(getAllAds, payload.id);
    yield put(AdActions.onUpdateSuccess(get(detailResult, "data.ad")));
    yield put(AdActions.onGetList());
  } catch (error) {
    yield put(AdActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteAd, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(AdActions.onDeleteSuccess(data));
    yield put(AdActions.onGetList());
  } catch (error) {
    yield put(AdActions.onDeleteError(error));
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(AdActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(AdActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(AdActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(AdActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(AdActionTypes.DELETE, handleDelete);
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
