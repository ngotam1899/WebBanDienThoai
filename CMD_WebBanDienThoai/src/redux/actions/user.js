export const UsersActionTypes = {
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

Object.keys(UsersActionTypes).forEach((key) => {
  UsersActionTypes[
    key
  ] = `USERS_${UsersActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: UsersActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: UsersActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: UsersActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (payload) => ({
  type: UsersActionTypes.GET_LIST_SUCCESS,
  payload,
});

const onGetListError = (error) => ({
  type: UsersActionTypes.GET_LIST_ERROR,
  payload: error,
});

/**
 *
 * @param String id
 */
const onGetDetail = (id) => ({
  type: UsersActionTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: UsersActionTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: UsersActionTypes.GET_DETAIL_ERROR,
  payload: error,
});

/**
 *
 * create
 */
const onCreate = ({params, formData}) => ({
  type: UsersActionTypes.CREATE,
  payload: {params, formData}
});

const onCreateSuccess = (detail) => ({
  type: UsersActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: UsersActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params, formData }) => ({
  type: UsersActionTypes.UPDATE,
  payload: { id, params, formData },
});

const onUpdateSuccess = (detail) => ({
  type: UsersActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: UsersActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: UsersActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: UsersActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: UsersActionTypes.DELETE_ERROR,
  payload: error,
});

const UsersActions = {
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

export default UsersActions;
