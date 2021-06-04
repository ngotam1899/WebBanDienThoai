export const NotificationActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_NEWEST: "GET_NEWEST",
  GET_NEWEST_SUCCESS: "GET_NEWEST_SUCCESS",
  GET_NEWEST_ERROR: "GET_NEWEST_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  UPDATE_ALL: "UPDATE_ALL",
  UPDATE_ALL_SUCCESS: "UPDATE_ALL_SUCCESS",
  UPDATE_ALL_ERROR: "UPDATE_ALL_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  DELETE_ALL: "DELETE_ALL",
  DELETE_ALL_SUCCESS: "DELETE_ALL_SUCCESS",
  DELETE_ALL_ERROR: "DELETE_ALL_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(NotificationActionTypes).forEach((key) => {
  NotificationActionTypes[key] = `NOTIFICATION_${NotificationActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: NotificationActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: NotificationActionTypes.CLEAR_STATE,
});

/**
 *
 * get list
 */

const onGetNewest = (payload) => ({
  type: NotificationActionTypes.GET_NEWEST,
  payload,
});

const onGetNewestSuccess = (detail, total) => ({
  type: NotificationActionTypes.GET_NEWEST_SUCCESS,
  payload: {detail, total},
});

const onGetNewestError = (error) => ({
  type: NotificationActionTypes.GET_NEWEST_ERROR,
  payload: error,
});

const onGetList = (payload) => ({
  type: NotificationActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: NotificationActionTypes.GET_LIST_SUCCESS,
  payload: {list, total},
});

const onGetListError = (error) => ({
  type: NotificationActionTypes.GET_LIST_ERROR,
  payload: error,
});

/**
 *
 * create
 */

const onCreate = (data) => ({
  type: NotificationActionTypes.CREATE,
  payload: data,
});

const onCreateSuccess = (detail) => ({
  type: NotificationActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: NotificationActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = (id, data, params) => ({
  type: NotificationActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: NotificationActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: NotificationActionTypes.UPDATE_ERROR,
  payload: error,
});

const onUpdateAll = (data, params) => ({
  type: NotificationActionTypes.UPDATE_ALL,
  payload: { data, params },
});

const onUpdateAllSuccess = (payload) => ({
  type: NotificationActionTypes.UPDATE_ALL_SUCCESS,
  payload,
});

const onUpdateAllError = (error) => ({
  type: NotificationActionTypes.UPDATE_ALL_ERROR,
  payload: error,
});


/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: NotificationActionTypes.DELETE,
  payload : { id, params },
});

const onDeleteSuccess = (detail) => ({
  type: NotificationActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: NotificationActionTypes.DELETE_ERROR,
  payload: error,
});

const onDeleteAll = (id, params) => ({
  type: NotificationActionTypes.DELETE_ALL,
  payload: { id, params },
});

const onDeleteAllSuccess = (detail) => ({
  type: NotificationActionTypes.DELETE_ALL_SUCCESS,
  payload: detail,
});

const onDeleteAllError = (error) => ({
  type: NotificationActionTypes.DELETE_ALL_ERROR,
  payload: error,
});

const NotificationActions = {
  onGetNewest,
  onGetNewestSuccess,
  onGetNewestError,

  onGetList,
  onGetListSuccess,
  onGetListError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onDelete,
  onDeleteSuccess,
  onDeleteError,

  onUpdateAll,
  onUpdateAllSuccess,
  onUpdateAllError,

  onDeleteAll,
  onDeleteAllSuccess,
  onDeleteAllError,

  onClearDetail,
  onClearState,
};

export default NotificationActions;
