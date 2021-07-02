export const AdActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(AdActionTypes).forEach((key) => {
  AdActionTypes[
    key
  ] = `AD_${AdActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: AdActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: AdActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: AdActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: AdActionTypes.GET_LIST_SUCCESS,
  payload: {list, total},
});

const onGetListError = (error) => ({
  type: AdActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: AdActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: AdActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: AdActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (data, params) => ({
  type: AdActionTypes.CREATE,
  payload: {data, params},
});

const onCreateSuccess = (detail) => ({
  type: AdActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: AdActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = (id, data, params) => ({
  type: AdActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: AdActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: AdActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: AdActionTypes.DELETE,
  id, params
});

const onDeleteSuccess = (detail) => ({
  type: AdActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: AdActionTypes.DELETE_ERROR,
  payload: error,
});

const AdActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearDetail,
  onClearState,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onDelete,
  onDeleteSuccess,
  onDeleteError,
};

export default AdActions;
