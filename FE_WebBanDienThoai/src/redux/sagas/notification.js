import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import NotificationActions, { NotificationActionTypes } from "../actions/notification";
import { getAllNotifications, getNewestNotifications, addNotification, updateNotification, deleteNotification, updateAllNotifications, deleteAllNotifications } from "../apis/notification";

function* handleGetNewest({ payload }) {
  try {
    const result = yield call(getNewestNotifications, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onGetNewestSuccess(data.notifications, data.total));
  } catch (error) {
    yield put(NotificationActions.onGetNewestError(error));
  }
}

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllNotifications, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onGetListSuccess(data.notifications, data.total));
  } catch (error) {
    yield put(NotificationActions.onGetListError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    if(payload){
      const result = yield call(addNotification, payload);
      const data = get(result, "data", {});
      if (data.code !== 201) throw data;
      yield put(NotificationActions.onCreateSuccess(data.notification));
    }
  } catch (error) {
    yield put(NotificationActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateNotification, payload.id, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onUpdateSuccess(data));
    yield put(NotificationActions.onGetList(payload.params));
    yield put(NotificationActions.onGetNewest({...payload.params, limit: 5}));
  } catch (error) {
    yield put(NotificationActions.onUpdateError(error));
  }
}

function* handleUpdateAll({ payload }) {
  try {
    const result = yield call(updateAllNotifications, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onUpdateAllSuccess(data));
    yield put(NotificationActions.onGetList(payload.params));
    yield put(NotificationActions.onGetNewest({...payload.params, limit: 5}));
  } catch (error) {
    yield put(NotificationActions.onUpdateAllError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ payload }) {
  try {
    const result = yield call(deleteNotification, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onDeleteSuccess(data));
    yield put(NotificationActions.onGetList(payload.params));
    yield put(NotificationActions.onGetNewest({...payload.params, limit: 5}));
  } catch (error) {
    yield put(NotificationActions.onDeleteError(error));
  }
}

function* handleDeleteAll({ payload }) {
  try {
    const result = yield call(deleteAllNotifications, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(NotificationActions.onDeleteAllSuccess(data));
    yield put(NotificationActions.onGetList(payload.params));
    yield put(NotificationActions.onGetNewest({...payload.params, limit: 5}));
  } catch (error) {
    yield put(NotificationActions.onDeleteAllError(error));
  }
}

export function* watchGetNewest() {
  yield takeEvery(NotificationActionTypes.GET_NEWEST, handleGetNewest);
}
export function* watchGetList() {
  yield takeEvery(NotificationActionTypes.GET_LIST, handleGetList);
}
export function* watchCreate() {
  yield takeEvery(NotificationActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(NotificationActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(NotificationActionTypes.DELETE, handleDelete);
}
export function* watchUpdateAll() {
  yield takeEvery(NotificationActionTypes.UPDATE_ALL, handleUpdateAll);
}
export function* watchDeleteAll() {
  yield takeEvery(NotificationActionTypes.DELETE_ALL, handleDeleteAll);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNewest),
    fork(watchGetList),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
    fork(watchUpdateAll),
    fork(watchDeleteAll),
  ]);
}
