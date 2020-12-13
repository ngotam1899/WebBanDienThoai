export const OrdersActionTypes = {
  ADD_ORDER: "ADD_ORDER",
  ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
  ADD_ORDER_ERROR: "ADD_ORDER_ERROR",

  SEND_CONFIRM_EMAIL: "SEND_CONFIRM_EMAIL",
  SEND_CONFIRM_EMAIL_SUCCESS: "SEND_CONFIRM_EMAIL_SUCCESS",
  SEND_CONFIRM_EMAIL_ERROR: "SEND_CONFIRM_EMAIL_ERROR",

  CONFIRM_ORDER: "CONFIRM_ORDER",
  CONFIRM_ORDER_SUCCESS: "CONFIRM_ORDER_SUCCESS",
  CONFIRM_ORDER_ERROR: "CONFIRM_ORDER_ERROR",
};

Object.keys(OrdersActionTypes).forEach((key) => {
  OrdersActionTypes[
    key
  ] = `ORDER_${OrdersActionTypes[key]}`;
});

const onCreateAnOrder = (payload) => ({
  type: OrdersActionTypes.ADD_ORDER, 
  payload
});
const onCreateAnOrderSuccess = (data) => ({
  type: OrdersActionTypes.ADD_ORDER_SUCCESS,
  payload: data
});
const onCreateAnOrderError = (error) => ({
  type: OrdersActionTypes.ADD_ORDER_ERROR,
  payload: error
});
const onSendConfirmEmail = (payload) => ({
  type: OrdersActionTypes.SEND_CONFIRM_EMAIL, 
  payload
});
const onSendConfirmEmailSuccess = (data) => ({
  type: OrdersActionTypes.SEND_CONFIRM_EMAIL_SUCCESS,
  payload: data
});
const onSendConfirmEmailError = (error) => ({
  type: OrdersActionTypes.SEND_CONFIRM_EMAIL_ERROR,
  payload: error
});
const onConfirmOrder = (token) => ({
  type: OrdersActionTypes.CONFIRM_ORDER,
  payload: token
});
const onConfirmOrderSuccess = (data) => ({
  type: OrdersActionTypes.CONFIRM_ORDER_SUCCESS,
  payload: data
});
const onConfirmOrderError = (error) => ({
  type: OrdersActionTypes.CONFIRM_ORDER_ERROR,
  payload: error
});

const OrdersAction = {
  onCreateAnOrder,
  onCreateAnOrderError,
  onCreateAnOrderSuccess,

  onSendConfirmEmail,
  onSendConfirmEmailSuccess,
  onSendConfirmEmailError,

  onConfirmOrder,
  onConfirmOrderSuccess,
  onConfirmOrderError,
};

export default OrdersAction;
