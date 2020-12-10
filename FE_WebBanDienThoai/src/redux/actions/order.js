export const OrdersActionTypes = {
  ADD_ORDER: "ADD_ORDER",
  ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
  ADD_ORDER_ERROR: "ADD_ORDER_ERROR",
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

const OrdersAction = {
  onCreateAnOrder,
  onCreateAnOrderError,
  onCreateAnOrderSuccess,
};

export default OrdersAction;
