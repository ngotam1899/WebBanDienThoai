import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import AuthorizationActions, { AuthorizationActionTypes } from "../actions/auth";
import OrdersActions, { OrdersActionTypes } from "../actions/order";
import { registerAccount, loginAccount, activateAccount, getProfile, loginGoogle, loginFacebook, } from "../apis/auth";
import {orderHistory } from "../apis/order";
import { AsyncStorage } from 'react-native';

/**
 *
 * create
 */

function* handleRegister({ payload }) {
  try {
    const result = yield call(registerAccount, payload);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(AuthorizationActions.onRegisterSuccess(data));
  } catch (error) {
    yield put(AuthorizationActions.onRegisterError(error));
  }
}

async function storeToken(token) {
  try {
    await AsyncStorage.setItem('AUTH_USER', token);
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}

function* handleLogin({ payload }) {
  try {
    const result = yield call(loginAccount, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield call (storeToken, result.headers.authorization);
    yield put(AuthorizationActions.onLoginSuccess(data.user));
  } catch (error) {
    yield put(AuthorizationActions.onLoginError(error));
  }
}

function* handleLoginFacebook({ payload }) {
  try {
    const result = yield call(loginFacebook, {"access_token" :payload});
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield call (storeToken, result.headers.authorization);
    yield put(AuthorizationActions.onLoginFacebookSuccess(data.user));
  } catch (error) {
    yield put(AuthorizationActions.onLoginFacebookError(error));
  }
}

function* handleLoginGoogle({ payload }) {
  try {
    const result = yield call(loginGoogle, {"access_token":payload});
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield call (storeToken, result.headers.authorization);
    yield put(AuthorizationActions.onLoginGoogleSuccess(data.user));
  } catch (error) {
    yield put(AuthorizationActions.onLoginGoogleError(error));
  }
}

function* handleActiveAccount({ payload}) {
  try {
    const result = yield call(activateAccount, payload);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(AuthorizationActions.onActivateAccountSuccess(data));
  } catch (error) {
    yield put(AuthorizationActions.onActivateAccountError(error));
  }
}

function* handleGetProfile() {
  try {
    //1. Get profile
    const result = yield call(getProfile, null);
    const data = get(result, "data.user", {}); 
    yield put(AuthorizationActions.onGetProfileSuccess(data));
    //2. Get user info details
    //3. Get order history
/*     const orderData = yield call(orderHistory, data._id); 
    yield put(OrdersActions.onGetHistoryOrderSuccess(orderData.data.orders));*/
  } catch (error) {
    yield put(AuthorizationActions.onGetProfileError(error));
  }
}
/**
 *
 */
export function* watchRegister() {
  yield takeEvery(AuthorizationActionTypes.REGISTER, handleRegister);
}

export function* watchLogin() {
  yield takeEvery(AuthorizationActionTypes.LOGIN, handleLogin);
}
export function* watchLoginFacebook() {
  yield takeEvery(AuthorizationActionTypes.LOGIN_FACEBOOK, handleLoginFacebook);
}
export function* watchLoginGoogle() {
  yield takeEvery(AuthorizationActionTypes.LOGIN_GOOGLE, handleLoginGoogle);
}

export function* watchActivateAccount() {
  yield takeEvery(AuthorizationActionTypes.ACTIVATE_ACCOUNT, handleActiveAccount);
}

export function* watchGetProfile() {
  yield takeEvery(AuthorizationActionTypes.GET_PROFILE, handleGetProfile);
}

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLoginFacebook),
    fork(watchLoginGoogle),
    fork(watchActivateAccount),
    fork(watchGetProfile),
  ]);
}
