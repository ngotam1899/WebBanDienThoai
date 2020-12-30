export const OperationActionTypes = {
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

Object.keys(OperationActionTypes).forEach((key) => {
  OperationActionTypes[
    key
  ] = `OPERATION_${OperationActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: OperationActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: OperationActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: OperationActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: OperationActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: OperationActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: OperationActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: OperationActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: OperationActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (params) => ({
  type: OperationActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: OperationActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: OperationActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params }) => ({
  type: OperationActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: OperationActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: OperationActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: OperationActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: OperationActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: OperationActionTypes.DELETE_ERROR,
  payload: error,
});

const OperationActions = {
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

export default OperationActions;
