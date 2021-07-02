import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ReviewActions, { ReviewActionTypes } from "../actions/review";
import { getAllReviews, deleteReview } from "../apis/review";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllReviews, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onGetListSuccess(data.reviews, data.total));
  } catch (error) {
    yield put(ReviewActions.onGetListError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteReview, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onDeleteSuccess(data));
    yield put(ReviewActions.onGetList(params));
  } catch (error) {
    yield put(ReviewActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ReviewActionTypes.GET_LIST, handleGetList);
}
export function* watchDelete() {
  yield takeEvery(ReviewActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchDelete),
  ]);
}
