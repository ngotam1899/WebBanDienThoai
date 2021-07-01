import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import AdActions, { AdActionTypes } from "../actions/ad";
import { getAllAds } from "../apis/ad";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllAds, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(AdActions.onGetListSuccess(data.ads));
  } catch (error) {
    yield put(AdActions.onGetListError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(AdActionTypes.GET_LIST, handleGetList);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
