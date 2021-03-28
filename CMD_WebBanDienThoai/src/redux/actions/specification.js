export const SpecificationActionTypes = {
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

Object.keys(SpecificationActionTypes).forEach((key) => {
  SpecificationActionTypes[
    key
  ] = `SPECIFICATION_${SpecificationActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: SpecificationActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: SpecificationActionTypes.CLEAR_STATE,
});


//----------------  Get list  ----------------------

const onGetList = (payload) => ({
  type: SpecificationActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: SpecificationActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: SpecificationActionTypes.GET_LIST_ERROR,
  payload: error,
});

//----------------  Get Detail  --------------------

const onGetDetail = (id) => ({
  type: SpecificationActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: SpecificationActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: SpecificationActionTypes.GET_DETAIL_ERROR,
  payload: error
});

//----------------  Create  ----------------------

const onCreate = (params) => ({
  type: SpecificationActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: SpecificationActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: SpecificationActionTypes.CREATE_ERROR,
  payload: error,
});

//----------------  Delete ----------------------

const onDelete = ({ id }) => ({
  type: SpecificationActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: SpecificationActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: SpecificationActionTypes.DELETE_ERROR,
  payload: error,
});

//-----------------  Update  ---------------------

const onUpdate = ({ id, params }) => ({
  type: SpecificationActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: SpecificationActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: SpecificationActionTypes.UPDATE_ERROR,
  payload: error,
});

//----------------  Filter  ----------------------

const onFilter = keyword => ({
  type: SpecificationActionTypes.FILTER,
  payload: {
    keyword,
  },
});

const onFilterSuccess = data => ({
  type: SpecificationActionTypes.FILTER_SUCCESS,
  payload: data,
});

const SpecificationActions = {
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

export default SpecificationActions;
