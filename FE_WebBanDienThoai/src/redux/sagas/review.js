import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ReviewActions, { ReviewActionTypes } from "../actions/review";
import { getProductReview } from "../apis/review";

function* handleGetList({id}) {
  try {
    const result = yield call(getProductReview, id);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ReviewActions.onGetListSuccess(data.reviews));
  } catch (error) {
    yield put(ReviewActions.onGetListError(error));
  }
}


/**
 *
 */

export function* watchGetList() {
  yield takeEvery(ReviewActionTypes.GET_LIST, handleGetList);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
