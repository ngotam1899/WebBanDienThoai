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
function* handleUpdate( {payload} ) {
  const {firstname, lastname, phonenumber, address, email} = payload.params;
  var result, detailResult = null;
  console.log("image: ",payload.params.image)
  try {
    if(payload.params.image){
      var image = yield call(addImage, payload.params.image);
      result = yield call(updateUserInfo,
      { firstname, lastname, phonenumber, address, email,
        "image": image.data.images[0]._id
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
    }
    else{
      result = yield call(updateUserInfo, {firstname, lastname, phonenumber, address, email, image}, payload.id);
      const data = get(result, "data", {});
      if (data.code !== 200) throw data;
    }
    detailResult = yield call(getUser, payload.id);
    yield put(UsersActions.onUpdateSuccess(detailResult.data.user));
    yield put(AuthorizationActions.onGetProfile());
  } catch (error) {
    yield put(UsersActions.onUpdateError(error));
  }
}

function* handleChangePassword( {payload} ) {
  try {
    console.log('data: ',payload)
    const result = yield call(changePassword, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onChangePasswordSuccess(data.message));
  } catch (error) {
    yield put(UsersActions.onChangePasswordError(error));
  }
}

/**
 *
 */
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
  ]);
}
