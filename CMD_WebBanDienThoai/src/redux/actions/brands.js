export const BrandActionTypes = {
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

Object.keys(BrandActionTypes).forEach((key) => {
  BrandActionTypes[
    key
  ] = `BRAND_${BrandActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: BrandActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: BrandActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: BrandActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: BrandActionTypes.GET_LIST_SUCCESS,
  payload: {list, total},
});

const onGetListError = (error) => ({
  type: BrandActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: BrandActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (image) => ({
  type: BrandActionTypes.GET_DETAIL_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: BrandActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (data, params) => ({
  type: BrandActionTypes.CREATE,
  payload: {data, params},
});

const onCreateSuccess = (detail) => ({
  type: BrandActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: BrandActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = (id, data, params) => ({
  type: BrandActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: BrandActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: BrandActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: BrandActionTypes.DELETE,
  id, params
});

const onDeleteSuccess = (detail) => ({
  type: BrandActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: BrandActionTypes.DELETE_ERROR,
  payload: error,
});


const BrandActions = {
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

  onClearDetail,
  onClearState,
};

export default BrandActions;
