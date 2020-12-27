export const CategoryActionTypes = {
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

Object.keys(CategoryActionTypes).forEach((key) => {
  CategoryActionTypes[
    key
  ] = `CATEGORY_${CategoryActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: CategoryActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: CategoryActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: CategoryActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: CategoryActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: CategoryActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: CategoryActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: CategoryActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: CategoryActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (params) => ({
  type: CategoryActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: CategoryActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: CategoryActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params }) => ({
  type: CategoryActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: CategoryActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: CategoryActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: CategoryActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: CategoryActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: CategoryActionTypes.DELETE_ERROR,
  payload: error,
});

const CategoryActions = {
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

export default CategoryActions;
