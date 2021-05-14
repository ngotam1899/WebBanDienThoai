import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import BrandActions, { BrandActionTypes } from "../actions/brands";
import { getAllBrands } from "../apis/brands";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllBrands, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetListSuccess(data.brands, data.count));
  } catch (error) {
    yield put(BrandActions.onGetListError(error));
  }
}


/**
 *
 */

export function* watchGetList() {
  yield takeEvery(BrandActionTypes.GET_LIST, handleGetList);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
