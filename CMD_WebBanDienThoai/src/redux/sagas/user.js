import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UsersActions, { UsersActionTypes } from "../actions/user";
import { getAllUsers, getDetailUser,  deleteUser, getOnlineUsers, getSessionUsers } from "../apis/user";
import UIActions from "../actions/ui";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    const result = yield call(getAllUsers, payload);
    const data = get(result, "data");
    yield put(UsersActions.onGetListSuccess(data.users, data.total));
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
    const result = yield call(deleteUser, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onDeleteSuccess(data));
    yield put(UsersActions.onGetList());
  } catch (error) {
    yield put(UsersActions.onDeleteError(error));
  }
}

function* handleGetOnline({ payload }) {
  try {
    const result = yield call(getOnlineUsers, payload);
    const data = get(result, "data");
    yield put(UsersActions.onGetOnlineSuccess(data.total));
  } catch (error) {
    yield put(UsersActions.onGetOnlineError(error));
  }
}

function* handleGetSession({ payload }) {
  try {
    const result = yield call(getSessionUsers, payload);
    const data = get(result, "data");
    yield put(UsersActions.onGetSessionSuccess(data.total));
  } catch (error) {
    yield put(UsersActions.onGetSessionError(error));
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
export function* watchDelete() {
  yield takeEvery(UsersActionTypes.DELETE, handleDelete);
}
export function* watchGetOnline() {
  yield takeEvery(UsersActionTypes.GET_ONLINE, handleGetOnline);
}
export function* watchGetSession() {
  yield takeEvery(UsersActionTypes.GET_SESSION, handleGetSession);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchDelete),
    fork(watchGetOnline),
    fork(watchGetSession),
  ]);
}
