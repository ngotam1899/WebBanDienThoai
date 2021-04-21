export const GroupActionTypes = {
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

  FILTER: "FILTER",
  FILTER_SUCCESS: "FILTER_SUCCESS",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
}

Object.keys(GroupActionTypes).forEach((key) => {
  GroupActionTypes[
    key
  ] = `GROUP_${GroupActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: GroupActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: GroupActionTypes.CLEAR_STATE,
});


//----------------  Get list  ----------------------

const onGetList = (payload) => ({
  type: GroupActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: GroupActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: GroupActionTypes.GET_LIST_ERROR,
  payload: error,
});

//----------------  Get Detail  --------------------

const onGetDetail = (id) => ({
  type: GroupActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: GroupActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: GroupActionTypes.GET_DETAIL_ERROR,
  payload: error
});

//----------------  Create  ----------------------

const onCreate = (params) => ({
  type: GroupActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: GroupActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: GroupActionTypes.CREATE_ERROR,
  payload: error,
});

//----------------  Delete ----------------------

const onDelete = ({ id }) => ({
  type: GroupActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: GroupActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: GroupActionTypes.DELETE_ERROR,
  payload: error,
});

//-----------------  Update  ---------------------

const onUpdate = ({ id, params }) => ({
  type: GroupActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: GroupActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: GroupActionTypes.UPDATE_ERROR,
  payload: error,
});

//----------------  Filter  ----------------------

const onFilter = keyword => ({
  type: GroupActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: GroupActionTypes.FILTER_SUCCESS,
  payload: data,
});

const GroupActions = {
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

export default GroupActions;
