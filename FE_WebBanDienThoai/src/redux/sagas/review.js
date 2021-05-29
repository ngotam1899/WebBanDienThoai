import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ReviewActions, { ReviewActionTypes } from "../actions/review";
import { getAllProductReview, getAProductReview, addReview, updateReview } from "../apis/review";

function* handleGetList({payload}) {
  try {
    const result = yield call(getAllProductReview, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onGetListSuccess(data.reviews, data.total, data.count));
  } catch (error) {
    yield put(ReviewActions.onGetListError(error));
  }
}

function* handleGetDetail({payload}) {
  try {
    const result = yield call(getAProductReview, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onGetDetailSuccess(data.review));
  } catch (error) {
    yield put(ReviewActions.onGetDetailError(error));
  }
}

function* handleCreate({ payload }) {
  try {
    const result = yield call(addReview, payload);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(ReviewActions.onCreateSuccess(data));
  } catch (error) {
    yield put(ReviewActions.onCreateError(error));
  }
}

function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateReview, payload.id, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onUpdateSuccess(data.review));
    yield put(ReviewActions.onGetList(payload.params))
  } catch (error) {
    yield put(ReviewActions.onUpdateError(error));
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(ReviewActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(ReviewActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(ReviewActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(ReviewActionTypes.UPDATE, handleUpdate);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
  ]);
}
