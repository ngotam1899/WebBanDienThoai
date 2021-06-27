import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import AddressActions, { AddressActionTypes } from "../actions/address";
import { getAllCity, getDistrictByCity, getWardByCityAndDistrict, getShippingFee } from "../apis/address";

function* handleGetListCity() {
  try {
    const result = yield call(getAllCity);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(AddressActions.onGetCitySuccess(data.data));
  } catch (error) {
    yield put(AddressActions.onGetCityError(error));
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
    yield put(AddressActions.onGetWardError(error));
  }
}

function* handleCalculateShipping({payload}) {
  try {
    const result = yield call(getShippingFee,payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(AddressActions.onCalculateShippingSuccess(data.data));
  } catch (error) {
    yield put(AddressActions.onCalculateShippingError(error));
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
export function* watchCalculateShipping() {
  yield takeEvery(AddressActionTypes.CALCULATE_SHIPPING, handleCalculateShipping);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetListCity),
    fork(watchGetListDistrict),
    fork(watchGetListWard),
    fork(watchCalculateShipping),
  ]);
}