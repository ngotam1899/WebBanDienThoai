export const DisplayActionTypes = {
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

Object.keys(DisplayActionTypes).forEach((key) => {
  DisplayActionTypes[
    key
  ] = `DISPLAY_${DisplayActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: DisplayActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: DisplayActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: DisplayActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: DisplayActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: DisplayActionTypes.GET_LIST_ERROR,
  payload: error,
});

/**
 *
 * @param String id
 */
const onGetDetail = (id) => ({
  type: DisplayActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: DisplayActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: DisplayActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

/**
 *
 * create
 */
const onCreate = (params) => ({
  type: DisplayActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: DisplayActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: DisplayActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params }) => ({
  type: DisplayActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: DisplayActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: DisplayActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: DisplayActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: DisplayActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: DisplayActionTypes.DELETE_ERROR,
  payload: error,
});
const DisplayActions = {
  onClearDetail,
  onClearState,

  onGetList,
  onGetListSuccess,
  onGetListError,

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

export default DisplayActions;
