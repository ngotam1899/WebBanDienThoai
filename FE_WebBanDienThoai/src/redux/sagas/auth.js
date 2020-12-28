import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import AuthorizationActions, { AuthorizationActionTypes } from "../actions/auth";
import OrdersActions, { OrdersActionTypes } from "../actions/order";
import UsersActions, { UsersActionTypes } from "../actions/user";
import { registerAccount, loginAccount, activateAccount, getProfile, loginGoogle, loginFacebook, } from "../apis/auth";
import {orderHistory } from "../apis/order";
import { getUserImage } from "../apis/cloudinary";

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    yield put(AuthorizationActions.onLoginFacebookError(error));
  }
}

function* handleLoginGoogle({ payload }) {
  console.log(payload);
  try {
    
    const result = yield call(loginGoogle, {"access_token":payload});
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    localStorage.setItem('AUTH_USER', result.headers.authorization);
    yield put(AuthorizationActions.onLoginGoogleSuccess(data.user));
  } catch (error) {
    console.log(error);
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
    console.log(error, "Incorect or Expired link");
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
    //3. Get avatar
    if(data.image){
      const image = yield call(getUserImage, data.image);
      yield put(UsersActions.onGetUserImageSuccess(get(image, "data.image.public_url")));
    }
    //4. Get order history
    const orderData = yield call(orderHistory, data._id);
    yield put(OrdersActions.onGetHistoryOrderSuccess(orderData.data.orders));
  } catch (error) {
    console.log(error, "Incorect or Expired link");
    yield put(AuthorizationActions.onGetProfileError(error));
  }
}
/**
 *
 * update
 */
/* function* handleUpdate({ payload, filters, callback, merchant_id }) {
  
  try {
    const result = yield call(EcommerceApi.Product.update, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    message.success("Update product success!");
    if (callback) {
      callback();
    }
    
    const detailResult = yield call(EcommerceApi.Product.getDetail, payload.id);
    yield put(ProductsActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(ProductsActions.onGetList(filters));
    if(merchant_id){
      yield put(MerchantActions.onGetListProduct({id:merchant_id}));
    }
  } catch (error) {
    console.log(error);
    message.error(get(error, "msg", "Error when Update product!"));
    yield put(ProductsActions.onUpdateError(error));
  }
} */

/**
 *
 * delete
 */
/* function* handleDelete({ id, filters, callback, merchant_id }) {
  try {
    const result = yield call(EcommerceApi.Product.delete, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    message.success("Delete product success!");
    if (callback) {
      callback();
    }
    yield put(ProductsActions.onDeleteSuccess(data));
    yield put(ProductsActions.onGetList(filters));
    if(merchant_id){
      yield put(MerchantActions.onGetListProduct({id:merchant_id}));
    }
  } catch (error) {
    console.log(error);
    message.error(get(error, "msg", "Error when Delete product!"));
    yield put(ProductsActions.onDeleteError(error));
  }
} */

/**
 *
 */
/* export function* watchGetList() {
  yield takeEvery(ProductsActionTypes.GET_LIST, handleGetList);
}

export function* watchGetDetail() {
  yield takeEvery(ProductsActionTypes.GET_DETAIL, handleGetDetail);
} */

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
/*export function* watchUpdate() {
  yield takeEvery(ProductsActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
} */

export default function* rootSaga() {
  yield all([
    /* fork(watchGetList),
    fork(watchGetDetail), */
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLoginFacebook),
    fork(watchLoginGoogle),
    fork(watchActivateAccount),
    fork(watchGetProfile),
    /* fork(watchUpdate),
    fork(watchDelete), */
  ]);
}
