import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import BrandActions, { BrandActionTypes } from "../actions/brands";
import { getAllBrands, getAllAccessory } from "../apis/brands";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllBrands, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetListSuccess(data.brands));
  } catch (error) {
    yield put(BrandActions.onGetListError(error));
  }
}

function* handleGetAccessory({ payload }) {
  try {
    const result = yield call(getAllAccessory, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetAccessorySuccess(data.brands));
  } catch (error) {
    yield put(BrandActions.onGetAccessoryError(error));
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(BrandActionTypes.GET_LIST, handleGetList);
}
export function* watchGetAccessory() {
  yield takeEvery(BrandActionTypes.GET_ACCESSORY, handleGetAccessory);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetAccessory),
  ]);
}
