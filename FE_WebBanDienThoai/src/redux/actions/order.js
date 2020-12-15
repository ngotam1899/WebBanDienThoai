export const OrdersActionsTypes = {
  ADD_ORDER: "ADD_ORDER",
  ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
  ADD_ORDER_ERROR: "ADD_ORDER_ERROR",

  SEND_CONFIRM_EMAIL: "SEND_CONFIRM_EMAIL",
  SEND_CONFIRM_EMAIL_SUCCESS: "SEND_CONFIRM_EMAIL_SUCCESS",
  SEND_CONFIRM_EMAIL_ERROR: "SEND_CONFIRM_EMAIL_ERROR",

  CONFIRM_ORDER: "CONFIRM_ORDER",
  CONFIRM_ORDER_SUCCESS: "CONFIRM_ORDER_SUCCESS",
  CONFIRM_ORDER_ERROR: "CONFIRM_ORDER_ERROR",

  GET_HISTORY_ORDER: "GET_HISTORY_ORDER",
  GET_HISTORY_ORDER_SUCCESS: "GET_HISTORY_ORDER_SUCCESS",
  GET_HISTORY_ORDER_ERROR: "GET_HISTORY_ORDER_ERROR",

  GET_PRODUCT_ORDER: "GET_PRODUCT_ORDER",
  GET_PRODUCT_ORDER_SUCCESS: "GET_PRODUCT_ORDER_SUCCESS",
  GET_PRODUCT_ORDER_ERROR: "GET_PRODUCT_ORDER_ERROR",
};

Object.keys(OrdersActionsTypes).forEach((key) => {
  OrdersActionsTypes[
    key
  ] = `ORDER_${OrdersActionsTypes[key]}`;
});

const onGetProductsOrder = (payload) =>({
  type: OrdersActionsTypes.GET_PRODUCT_ORDER, 
  payload
});
const onGetProductsOrderSuccess = (data) => ({
  type: OrdersActionsTypes.GET_PRODUCT_ORDER_SUCCESS,
  payload: data
});
const onGetProductsOrderError = (error) => ({
  type: OrdersActionsTypes.GET_PRODUCT_ORDER_ERROR,
  payload: error
});


const onCreateAnOrder = (payload) => ({
  type: OrdersActionsTypes.ADD_ORDER, 
  payload
});
const onCreateAnOrderSuccess = (data) => ({
  type: OrdersActionsTypes.ADD_ORDER_SUCCESS,
  payload: data
});
const onCreateAnOrderError = (error) => ({
  type: OrdersActionsTypes.ADD_ORDER_ERROR,
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

const onGetHistoryOrder = (id) => ({
  type: OrdersActionsTypes.GET_HISTORY_ORDER,
  payload: id
});
const onGetHistoryOrderSuccess = (data) => ({
  type: OrdersActionsTypes.GET_HISTORY_ORDER_SUCCESS,
  payload: data
});
const onGetHistoryOrderError = (error) => ({
  type: OrdersActionsTypes.GET_HISTORY_ORDER_ERROR,
  payload: error
});

const OrdersActions = {
  onCreateAnOrder,
  onCreateAnOrderError,
  onCreateAnOrderSuccess,

  onSendConfirmEmail,
  onSendConfirmEmailSuccess,
  onSendConfirmEmailError,

  onConfirmOrder,
  onConfirmOrderSuccess,
  onConfirmOrderError,

  onGetHistoryOrder,
  onGetHistoryOrderSuccess,
  onGetHistoryOrderError,

  onGetProductsOrder,
  onGetProductsOrderSuccess,
  onGetProductsOrderError,
};

export default OrdersActions;
