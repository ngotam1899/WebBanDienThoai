/* eslint-disable no-return-await */

import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import { get } from "lodash";
import { message } from "antd";
import {
  LOGIN,
  onLoginSuccess,
  onLoginError,
  LOGOUT,
} from "../actions/auth";
import { endpoint } from "../../constants";
import api from "../drivers";

/* const apiGetDeviceCode = async () =>
  await api
    .post(`${endpoint}/device/init`, {
      device_type: 0,
    })
    .then((result) => result.data); */

const apiLogin = async (params) =>
  await api
    .post(`${endpoint}/auth/login`, params)
    .then((result) => result.data);

/* export const updateDeviceToken = async ({ deviceToken, deviceType }) =>
  await api.put(`${endpoint}/auth/device-token`, {
    device_type: deviceType,
    device_token: deviceToken,
  }); */

const apiLogout = async () => await api.get(`${endpoint}/auth/logout`);

// effect
function* handleLogin({ payload }) {
  try {
    const result = yield call(apiLogin, payload);
    if (result.code !== 200) {
      message.error(result.msg);
      throw result;
    }/* 
    const token = get(result, "data.token");
    console.log("token", token);
    window.localStorage.setItem(LocalStorage.Token, token); */
    yield put(onLoginSuccess(result));
  } catch (error) {
    console.log("Login error", error);
    yield put(onLoginError(error));
  }
}

/* function* handleDeviceInit(action) {
  try {
    const result = yield call(apiGetDeviceCode);
    if (result.code === 400) {
      message.error(result.msg);
      throw result;
    }
    window.localStorage.setItem(
      LocalStorage.Device,
      JSON.stringify(result.data)
    );
    yield put(onDeviceInitSuccess(result.data));
  } catch (error) {
    console.log("Init device error", error);
    yield put(onDeviceInitError(error));
  }
}

function* handelGetProfile() {
  try {
    const result = yield call(ProfileApi.getProfile);
    const data = get(result, "data");
    if (data.code !== 200) {
      console.log("data", data);
      throw data;
    }
    yield put({
      type: GET_PROFILE_SUCCESS,
      dataProfile: result.data.data,
    });
  } catch (error) {
    console.log("Can't get profile", error);
    yield put(onGetProfileError(error));
  }
} */

function* handleLogout() {
  try {
    const result = yield call(apiLogout);
    console.log("logout success", result);
  } catch (error) {
    console.log("Logout error", error);
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN, handleLogin);
}
/* 
function* watchDeviceInit() {
  yield takeEvery(DEVICE_INIT, handleDeviceInit);
}

function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, handelGetProfile);
} */
function* watchLogout() {
  yield takeEvery(LOGOUT, handleLogout);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    /* fork(watchDeviceInit),
    fork(watchGetProfile), */
    fork(watchLogout),
  ]);
}
