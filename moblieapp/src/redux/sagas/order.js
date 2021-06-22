import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import OrdersActions, { OrdersActionsTypes } from "../actions/order";
import ProductsActions from "../actions/products";
import NotificationActions from "../actions/notification"
import { addOrder, sendConfirmEmail, confirmOrder, getDetailOrder, updateOrder, getAllOrder } from "../apis/order";
import {AsyncStorage} from 'react-native';
import io from 'socket.io-client';
import {API_ENDPOINT_AUTH} from '../../constants';

let socket = io(API_ENDPOINT_AUTH);

function* handleGetList({payload}) {
  try {
    const result = yield call(getAllOrder, payload);
    const data = get(result, "data")
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onGetListSuccess(data.orders));
    
  } catch (error) {
    yield put(OrdersActions.onGetListError(error));
  }
}

function* handleGetDetail({id}) {
  try {
    const result = yield call(getDetailOrder, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onGetDetailSuccess(data.order));
  } catch (error) {
    yield put(OrdersActions.onGetDetailError(error));
  }
}

function* handleReConfirm({ payload }) {
  try {
    const result = yield call(sendConfirmEmail, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    if (data.message !== "success") throw data;
    yield put(OrdersActions.onSendConfirmEmailSuccess(data));
  } catch (error) {
    yield put(OrdersActions.onSendConfirmEmailError(error));
  }
}

/**
 *
 * create
 */
 function* handleCreate({ payload }) {
  try {
    const result = yield call(addOrder, payload);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(OrdersActions.onCreateSuccess(data));
    const email = yield call(sendConfirmEmail, data.order._id);
    yield put(OrdersActions.onSendConfirmEmailSuccess(email.data));
    AsyncStorage.removeItem("cart");
    /* Notification */
    // if(payload.payment_method ==="paypal"){
    //   console.log('data: ',data.order)
    //   socket.emit('order', { email: data.order.email, order: data.order._id });
    //   console.log('11111111111')
    //   yield put(NotificationActions.onCreate({
    //     name : "Đơn hàng mới được xác nhận",
    //     image : data.order.order_list[0].image,
    //     type: 0,
    //     content :  `${data.order.email} vừa xác nhận đặt hàng thành công`
    //   }))
    // }
    /* Notification */
    yield put(ProductsActions.onClearCart())
  } catch (error) {
    yield put(OrdersActions.onCreateError(error));
  }
}

function* handleConfirmOrder({ payload}) {
  try {
    const result = yield call(confirmOrder, payload);
    const data = get(result, "data", {});  
    if (data.code !== 200) throw data;
    yield put(OrdersActions.onConfirmOrderSuccess(data));
    /* Notification */
    socket.emit('order', { email: data.order.email, order: data.order._id });
    yield put(NotificationActions.onCreate({
      name : "Đơn hàng mới được xác nhận",
      image : data.order.user.image,
      type: 0,
      content :  `${data.order.email} vừa xác nhận đặt hàng thành công`
    }))
    /* Notification */
  } catch (error) {
    yield put(OrdersActions.onConfirmOrderError(error));
  }
}

/**
 *
 * update
 */
/**
 *
 * delete
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateOrder, payload.id, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailOrder, payload.id);
    yield put(OrdersActions.onUpdateSuccess(get(detailResult, "data")));
  } catch (error) {
    yield put(OrdersActions.onUpdateError(error));
  }
}

/**
 *
 */
export function* watchGetList() {
  yield takeEvery(OrdersActionsTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(OrdersActionsTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(OrdersActionsTypes.CREATE, handleCreate);
}
export function* watchConfirmOrder() {
  yield takeEvery(OrdersActionsTypes.CONFIRM_ORDER, handleConfirmOrder);
}
export function* watchReConfirm() {
  yield takeEvery(OrdersActionsTypes.SEND_CONFIRM_EMAIL, handleReConfirm);
}
export function* watchUpdate() {
  yield takeEvery(OrdersActionsTypes.UPDATE, handleUpdate);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchConfirmOrder),
    fork(watchReConfirm),
    fork(watchUpdate),
  ]);
}
