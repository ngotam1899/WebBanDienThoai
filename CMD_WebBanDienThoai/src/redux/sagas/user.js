import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UsersActions, { UsersActionTypes } from "../actions/user";
import { getAllUsers, getDetailUser,  deleteUser, updateUser, getOnlineUsers, getSessionUsers } from "../apis/user";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllUsers, payload);
    const data = get(result, "data");
    yield put(UsersActions.onGetListSuccess(data.users, data.total));
  } catch (error) {
    yield put(UsersActions.onGetListError(error));
  }
}

function* handleFilter({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  console.log(keyword)
  try {
    const result = yield call(getAllUsers, {
      phone: keyword,
      limit: 5,
      page:0
    });
    const data = get(result, "data");
    yield put(UsersActions.onFilterSuccess(data.users));
  } catch (error) {
  }
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
 * update
 */

function* handleUpdate( {payload} ) {
  try {
    var result = yield call(updateUser, payload.data, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onUpdateSuccess(data.user));
    yield put(UsersActions.onGetList(payload.params));
  } catch (error) {
    yield put(UsersActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteUser, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(UsersActions.onDeleteSuccess(data));
    yield put(UsersActions.onGetList(params));
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
export function* watchUpdate() {
  yield takeEvery(UsersActionTypes.UPDATE, handleUpdate);
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
export function* watchFilter() {
  yield takeEvery(UsersActionTypes.FILTER, handleFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchUpdate),
    fork(watchDelete),
    fork(watchGetOnline),
    fork(watchGetSession),
    fork(watchFilter),
  ]);
}
