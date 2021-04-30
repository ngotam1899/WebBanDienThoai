import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import AddressActions, { AddressActionTypes } from "../actions/address";
import { getAllCity, getDistrictByCity, getWardByCityAndDistrict } from "../apis/address";

function* handleGetListCity() {
  try {
    const result = yield call(getAllCity);
    const data = get(result, "data");
    //if (data.code !== 200) throw data;
    yield put(AddressActions.onGetCitySuccess(data.data));
  } catch (error) {
    //yield put(AddressActions.onGetListError(error));
  }
}

function* handleGetListDistrict({payload}) {
  try {
    const result = yield call(getDistrictByCity, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(AddressActions.onGetDistrictSuccess(data.data));
  } catch (error) {
    yield put(AddressActions.onGetDistrictError(error));
  }
}

function* handleGetListWard({payload}) {
  try {
    const result = yield call(getWardByCityAndDistrict,payload.cityID,payload.districtID );
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(AddressActions.onGetWardSuccess(data.data));
  } catch (error) {
    //yield put(AddressActions.onGetListError(error));
  }
}

export function* watchGetListCity() {
  yield takeEvery(AddressActionTypes.GET_CITY, handleGetListCity);
}
export function* watchGetListDistrict() {
  yield takeEvery(AddressActionTypes.GET_DISTRICT, handleGetListDistrict);
}
export function* watchGetListWard() {
  yield takeEvery(AddressActionTypes.GET_WARD, handleGetListWard);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetListCity),
    fork(watchGetListDistrict),
    fork(watchGetListWard),
  ]);
}