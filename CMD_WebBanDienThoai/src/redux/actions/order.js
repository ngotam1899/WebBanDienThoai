export const OrderActionTypes = {
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

  GET_REVENUE: "GET_REVENUE",
  GET_REVENUE_SUCCESS: "GET_REVENUE_SUCCESS",
  GET_REVENUE_ERROR: "GET_REVENUE_ERROR",

  GET_REVENUE_LIST: "GET_REVENUE_LIST",
  GET_REVENUE_LIST_SUCCESS: "GET_REVENUE_LIST_SUCCESS",
  GET_REVENUE_LIST_ERROR: "GET_REVENUE_LIST_ERROR",

  GET_SESSION: "GET_SESSION",
  GET_SESSION_SUCCESS: "GET_SESSION_SUCCESS",
  GET_SESSION_ERROR: "GET_SESSION_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(OrderActionTypes).forEach((key) => {
  OrderActionTypes[
    key
  ] = `ORDER_${OrderActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: OrderActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: OrderActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: OrderActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: OrderActionTypes.GET_LIST_SUCCESS,
  payload: {list, total}
});

const onGetListError = (error) => ({
  type: OrderActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: OrderActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (image) => ({
  type: OrderActionTypes.GET_DETAIL_SUCCESS,
  payload: image
});
const onGetDetailError = (error) => ({
  type: OrderActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (params) => ({
  type: OrderActionTypes.CREATE,
  payload: params,
});

const onCreateSuccess = (detail) => ({
  type: OrderActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: OrderActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = ({ id, params }) => ({
  type: OrderActionTypes.UPDATE,
  payload: { id, params },
});

const onUpdateSuccess = (detail) => ({
  type: OrderActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: OrderActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = ({ id }) => ({
  type: OrderActionTypes.DELETE,
  id,
});

const onDeleteSuccess = (detail) => ({
  type: OrderActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: OrderActionTypes.DELETE_ERROR,
  payload: error,
});

/**
 *
 * revenue
 */

const onGetRevenue = (payload) => ({
  type: OrderActionTypes.GET_REVENUE,
  payload,
});

const onGetRevenueSuccess = (payload) => ({
  type: OrderActionTypes.GET_REVENUE_SUCCESS,
  payload
});

const onGetRevenueError = (error) => ({
  type: OrderActionTypes.GET_REVENUE_ERROR,
  payload: error,
});

const onGetRevenueList = (payload) => ({
  type: OrderActionTypes.GET_REVENUE_LIST,
  payload,
});

const onGetRevenueListSuccess = (payload) => ({
  type: OrderActionTypes.GET_REVENUE_LIST_SUCCESS,
  payload
});

const onGetRevenueListError = (error) => ({
  type: OrderActionTypes.GET_REVENUE_LIST_ERROR,
  payload: error,
});
/**
 *
 * session
 */

const onGetSession = (payload) => ({
  type: OrderActionTypes.GET_SESSION,
  payload,
});

const onGetSessionSuccess = (payload) => ({
  type: OrderActionTypes.GET_SESSION_SUCCESS,
  payload
});

const onGetSessionError = (error) => ({
  type: OrderActionTypes.GET_SESSION_ERROR,
  payload: error,
});

const OrderActions = {
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

  onGetRevenue,
  onGetRevenueSuccess,
  onGetRevenueError,

  onGetRevenueList,
  onGetRevenueListSuccess,
  onGetRevenueListError,

  onGetSession,
  onGetSessionSuccess,
  onGetSessionError,

  onClearDetail,
  onClearState,
};

export default OrderActions;
