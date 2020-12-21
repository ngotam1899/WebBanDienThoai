import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UsersActions, { UsersActionTypes } from "../actions/user";
import { getAllUsers, getDetailUser,  deleteUser } from "../apis/user";
import UIActions from "../actions/ui";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    yield delay(1000)
    const result = yield call(getAllUsers, payload);
    const data = get(result, "data");
    yield put(UsersActions.onGetListSuccess(data.users));
  } catch (error) {
    yield put(UsersActions.onGetListError(error));
  }
  yield put(UIActions.hideLoading());
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailUser, id);
    const data = get(result, "data", {});
    yield put(UsersActions.onGetDetailSuccess(data.user));
  } catch (error) {
    yield put(UsersActions.onGetDetailError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    console.log("id", id);
    const result = yield call(deleteUser, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onDeleteSuccess(data));
    yield put(UsersActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(UsersActions.onDeleteError(error));
  }
}

/**
 *
 */
export function* watchGetList() {
  yield takeEvery(UsersActionTypes.GET_LIST, handleGetList);
}

 export function* watchGetDetail() {
  yield takeEvery(UsersActionTypes.GET_DETAIL, handleGetDetail);
}

/* export function* watchCreate() {
  yield takeEvery(UsersActionTypes.CREATE, handleCreate);
}
export function* watchUpdateImage() {
  yield takeEvery(UsersActionTypes.UPDATE_IMAGE, handleUpdateImage);
} */
export function* watchDelete() {
  yield takeEvery(UsersActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    /* fork(watchCreate),
    fork(watchUpdateImage), */
    fork(watchDelete),
  ]);
}
