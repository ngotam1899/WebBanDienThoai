import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import AuthorizationActions, { AuthorizationActionTypes } from "../actions/auth";
import { loginAccount, getProfile } from "../apis/auth";

/**
 *
 * login
 */

function* handleLogin({ payload }) {
  try {
    const result = yield call(loginAccount, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    console.log(data.user.role)
    if (data.user.role !=="0" ) throw new Error("Tài khoản không hợp lệ")
    localStorage.setItem('AUTH_USER', result.headers.authorization);
    yield put(AuthorizationActions.onLoginSuccess(data.user));
  } catch (error) {
    yield put(AuthorizationActions.onLoginError(error));
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

export function* watchLogin() {
  yield takeEvery(AuthorizationActionTypes.LOGIN, handleLogin);
}
export function* watchGetProfile() {
  yield takeEvery(AuthorizationActionTypes.GET_PROFILE, handleGetProfile);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchGetProfile),
  ]);
}
