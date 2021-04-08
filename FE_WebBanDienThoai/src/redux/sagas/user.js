import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UsersActions, { UsersActionTypes } from "../actions/user";
import AuthorizationActions, { AuthorizationActionTypes } from "../actions/auth";
import { addImage } from "../apis/cloudinary";
import { updateUserInfo, getUser, changePassword } from "../apis/user";

/**
 *
 * update
 */
function* handleUpdateUserImage({payload}) {
  try {
    //1. Load User Image lên Cloudinary
    console.log(payload.id);
    const result = yield call(addImage, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    //2. Update user info
    const detailResult = yield call(updateUserInfo,{"image":data.images[0]._id}, payload.id);
    yield put(UsersActions.onUpdateUserImageSuccess(get(detailResult, "data")));
  } catch (error) {
    console.log(error);
    yield put(UsersActions.onUpdateUserImageError(error));
  }
}

function* handleUpdate( {payload} ) {
  try {
    const result = yield call(updateUserInfo, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getUser, payload.id);
    yield put(UsersActions.onUpdateSuccess(detailResult.data.user));
    yield put(AuthorizationActions.onGetProfile());
  } catch (error) {
    console.log(error);
    yield put(UsersActions.onUpdateError(error));
  }
}

function* handleChangePassword( {payload} ) {
  try {
    console.log(payload);
    const result = yield call(changePassword, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onChangePasswordSuccess(data.message));
  } catch (error) {
    console.log(error);
    yield put(UsersActions.onChangePasswordError(error));
  }
}

/**
 *
 */
export function* watchUpdateUserImage() {
  yield takeEvery(UsersActionTypes.UPDATE_USER_IMAGE, handleUpdateUserImage);
}
export function* watchUpdate() {
  yield takeEvery(UsersActionTypes.UPDATE, handleUpdate);
}
export function* watchChangePassword() {
  yield takeEvery(UsersActionTypes.CHANGE_PASSWORD, handleChangePassword);
}

export default function* rootSaga() {
  yield all([
    fork(watchChangePassword),
    fork(watchUpdate),
    fork(watchUpdateUserImage),
  ]);
}
