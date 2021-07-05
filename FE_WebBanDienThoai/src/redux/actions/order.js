export const OrdersActionsTypes = {
  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  SEND_CONFIRM_EMAIL: "SEND_CONFIRM_EMAIL",
  SEND_CONFIRM_EMAIL_SUCCESS: "SEND_CONFIRM_EMAIL_SUCCESS",
  SEND_CONFIRM_EMAIL_ERROR: "SEND_CONFIRM_EMAIL_ERROR",

  CONFIRM_ORDER: "CONFIRM_ORDER",
  CONFIRM_ORDER_SUCCESS: "CONFIRM_ORDER_SUCCESS",
  CONFIRM_ORDER_ERROR: "CONFIRM_ORDER_ERROR",

  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
};

Object.keys(OrdersActionsTypes).forEach((key) => {
  OrdersActionsTypes[
    key
  ] = `ORDER_${OrdersActionsTypes[key]}`;
});

const onClearDetail = () => ({
  type: OrdersActionsTypes.CLEAR_DETAIL,
});

const onGetDetail = (id) => ({
  type: OrdersActionsTypes.GET_DETAIL,
  id,
});

const onGetDetailSuccess = (detail) => ({
  type: OrdersActionsTypes.GET_DETAIL_SUCCESS,
  payload: detail,
});

const onGetDetailError = (error) => ({
  type: OrdersActionsTypes.GET_DETAIL_ERROR,
  payload: error,
});

const onCreate = (payload) => ({
  type: OrdersActionsTypes.CREATE, 
  payload
});
const onCreateSuccess = (data) => ({
  type: OrdersActionsTypes.CREATE_SUCCESS,
  payload: data
});
const onCreateError = (error) => ({
  type: OrdersActionsTypes.CREATE_ERROR,
  payload: error
});
const onSendConfirmEmail = (payload) => ({
  type: OrdersActionsTypes.SEND_CONFIRM_EMAIL, 
  payload
});
const onSendConfirmEmailSuccess = (data) => ({
  type: OrdersActionsTypes.SEND_CONFIRM_EMAIL_SUCCESS,
  payload: data
});
const onSendConfirmEmailError = (error) => ({
  type: OrdersActionsTypes.SEND_CONFIRM_EMAIL_ERROR,
  payload: error
});

const onConfirmOrder = (token) => ({
  type: OrdersActionsTypes.CONFIRM_ORDER,
  payload: token
});
const onConfirmOrderSuccess = (data) => ({
  type: OrdersActionsTypes.CONFIRM_ORDER_SUCCESS,
  payload: data
});
const onConfirmOrderError = (error) => ({
  type: OrdersActionsTypes.CONFIRM_ORDER_ERROR,
  payload: error
});

const onGetList = (payload) => ({
  type: OrdersActionsTypes.GET_LIST,
  payload
});
const onGetListSuccess = (list, total) => ({
  type: OrdersActionsTypes.GET_LIST_SUCCESS,
  payload: {list, total}
});
const onGetListError = (error) => ({
  type: OrdersActionsTypes.GET_LIST_ERROR,
  payload: error
});

const onUpdate = (id, data, params) => ({
  type: OrdersActionsTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: OrdersActionsTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: OrdersActionsTypes.UPDATE_ERROR,
  payload: error,
});

const OrdersActions = {
  onClearDetail,

  onCreate,
  onCreateError,
  onCreateSuccess,

  onSendConfirmEmail,
  onSendConfirmEmailSuccess,
  onSendConfirmEmailError,

  onConfirmOrder,
  onConfirmOrderSuccess,
  onConfirmOrderError,

  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,
  
  onUpdate,
  onUpdateSuccess,
  onUpdateError,
};

export default OrdersActions;
