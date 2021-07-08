export const InstallmentActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  GET_SESSION: "GET_SESSION",
  GET_SESSION_SUCCESS: "GET_SESSION_SUCCESS",
  GET_SESSION_ERROR: "GET_SESSION_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
}

Object.keys(InstallmentActionTypes).forEach((key) => {
  InstallmentActionTypes[
    key
  ] = `INSTALLMENT_${InstallmentActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: InstallmentActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: InstallmentActionTypes.CLEAR_STATE,
});


//----------------  Get list  ----------------------

const onGetList = (payload) => ({
  type: InstallmentActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: InstallmentActionTypes.GET_LIST_SUCCESS,
  payload: {list, total}
});

const onGetListError = (error) => ({
  type: InstallmentActionTypes.GET_LIST_ERROR,
  payload: error,
});

//----------------  Get Detail  --------------------

const onGetDetail = (id) => ({
  type: InstallmentActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: InstallmentActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: InstallmentActionTypes.GET_DETAIL_ERROR,
  payload: error
});

//----------------  Create  ----------------------

const onCreate = (data, params) => ({
  type: InstallmentActionTypes.CREATE,
  payload: {data, params},
});

const onCreateSuccess = (detail) => ({
  type: InstallmentActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: InstallmentActionTypes.CREATE_ERROR,
  payload: error,
});

//----------------  Delete ----------------------

const onDelete = (id, params) => ({
  type: InstallmentActionTypes.DELETE,
  id, params
});

const onDeleteSuccess = (detail) => ({
  type: InstallmentActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: InstallmentActionTypes.DELETE_ERROR,
  payload: error,
});

//-----------------  Update  ---------------------

const onUpdate = (id, data, params) => ({
  type: InstallmentActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: InstallmentActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: InstallmentActionTypes.UPDATE_ERROR,
  payload: error,
});

//----------------  Filter  ----------------------

const onFilter = keyword => ({
  type: InstallmentActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: InstallmentActionTypes.FILTER_SUCCESS,
  payload: data,
});

/**
 *
 * session
 */

 const onGetSession = (payload) => ({
  type: InstallmentActionTypes.GET_SESSION,
  payload,
});

const onGetSessionSuccess = (payload) => ({
  type: InstallmentActionTypes.GET_SESSION_SUCCESS,
  payload
});

const onGetSessionError = (error) => ({
  type: InstallmentActionTypes.GET_SESSION_ERROR,
  payload: error,
});

const InstallmentActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearDetail,
  onClearState,

  onFilter,
  onFilterSuccess,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onGetSession,
  onGetSessionSuccess,
  onGetSessionError,

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

export default InstallmentActions;
