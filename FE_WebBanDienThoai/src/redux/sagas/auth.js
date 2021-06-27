import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import AuthorizationActions, { AuthorizationActionTypes } from "../actions/auth";
import { registerAccount, loginAccount, activateAccount, getProfile, loginGoogle, loginFacebook, forgotPassword, activatePassword} from "../apis/auth";

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

function* handleLogin({ payload }) {
  try {
    const result = yield call(loginAccount, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    localStorage.setItem('AUTH_USER', result.headers.authorization);
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
    localStorage.setItem('AUTH_USER', result.headers.authorization);
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
    localStorage.setItem('AUTH_USER', result.headers.authorization);
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
  } catch (error) {
    yield put(AuthorizationActions.onGetProfileError(error));
  }
}

function* handleForgotPassword({ payload}) {
  try {
    const result = yield call(forgotPassword, payload);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(AuthorizationActions.onForgotPasswordSuccess(data));
  } catch (error) {
    yield put(AuthorizationActions.onForgotPasswordError(error));
  }
}


function* handleActivePassword({ payload}) {
  try {
    const result = yield call(activatePassword, payload.token, payload.data);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(AuthorizationActions.onActivatePasswordSuccess(data));
  } catch (error) {
    yield put(AuthorizationActions.onActivatePasswordError(error));
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
export function* watchForgotPassword() {
  yield takeEvery(AuthorizationActionTypes.FORGOT_PASSWORD, handleForgotPassword);
}
export function* watchGetProfile() {
  yield takeEvery(AuthorizationActionTypes.GET_PROFILE, handleGetProfile);
}
export function* watchActivePassword() {
  yield takeEvery(AuthorizationActionTypes.ACTIVATE_PASSWORD, handleActivePassword);
}

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLoginFacebook),
    fork(watchLoginGoogle),
    fork(watchActivateAccount),
    fork(watchForgotPassword),
    fork(watchGetProfile),
    fork(watchActivePassword),
  ]);
}
