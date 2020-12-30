export const ColorActionTypes = {
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

Object.keys(ColorActionTypes).forEach((key) => {
  ColorActionTypes[
    key
  ] = `COLOR_${ColorActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: ColorActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: ColorActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: ColorActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: ColorActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: ColorActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: ColorActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: ColorActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: ColorActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (params) => ({
  type: ColorActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: ColorActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: ColorActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params }) => ({
  type: ColorActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: ColorActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: ColorActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: ColorActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: ColorActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: ColorActionTypes.DELETE_ERROR,
  payload: error,
});

const ColorActions = {
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

export default ColorActions;
