import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import OrdersActions, { OrdersActionsTypes } from "../actions/order";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import { addOrder, sendConfirmEmail, confirmOrder, orderHistory } from "../apis/order";
import { getDetailProduct } from "../apis/products";
/* function* handleGetList({ payload }) {
  try {
    yield delay(500)
    const result = yield call(getAllProducts, payload);
    const data = get(result, "data");
    yield put(ProductsActions.onGetListSuccess(data.product));
  } catch (error) {
    yield put(ProductsActions.onGetListError(error));
  }
} */

function* handleGetProductsOrder({ payload }) {
  console.log("payload order", payload);
  try {
    /* const result = yield call(getAllProducts, payload);
    const data = get(result, "data");*/
    var data = [];
    yield put(OrdersActions.onGetProductsOrderSuccess(data)); 
  } catch (error) {
    yield put(OrdersActions.onGetProductsOrderError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  console.log("load",payload);
  try {
    const result = yield call(addOrder, payload);
    const data = get(result, "data", {});
    if (data.code !== 201 || data.code !== 200) throw data;
    yield put(OrdersActions.onCreateAnOrderSuccess(data));
    const email = yield call(sendConfirmEmail, data.order._id);
    yield put(OrdersActions.onSendConfirmEmailSuccess(email.data));
  } catch (error) {
    yield put(OrdersActions.onCreateAnOrderError(error));
  }
}

function* handleConfirmOrder({ payload}) {
  try {
    const result = yield call(confirmOrder, payload);
    const data = get(result, "data", {});  
    yield put(OrdersActions.onConfirmOrderSuccess(data));
  } catch (error) {
    console.log(error, "Incorect or Expired link");
    yield put(OrdersActions.onConfirmOrderError(error));
  }
}

function* handleHistoryOrder({ payload}) {
  try {
    const result = yield call(orderHistory, payload);
    const data = get(result, "data", {});  
    yield put(OrdersActions.onGetHistoryOrderSuccess(data.orders));
  } catch (error) {
    console.log(error, "Incorect or Expired link");
    yield put(OrdersActions.onGetHistoryOrderSuccess(error));
  }
}
/**
 *
 * update
 */
/* function* handleUpdateUserImage({payload}) {
  try {
    //1. Load User Image lên Cloudinary
    console.log(payload.id);
    const result = yield call(addUserImage, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    //2. Update user info
    const detailResult = yield call(updateUserInfo,{"image":data.image._id}, payload.id);
    yield put(UsersActions.onUpdateUserImageSuccess(get(detailResult, "data")));
    //3. Get user info
    
    
  } catch (error) {
    console.log(error);
    yield put(UsersActions.onUpdateUserImageError(error));
  }
} */

/**
 *
 * delete
 */
/* function* handleDelete({ id, filters, callback, merchant_id }) {
  try {
    const result = yield call(EcommerceApi.Product.delete, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    message.success("Delete product success!");
    if (callback) {
      callback();
    }
    yield put(ProductsActions.onDeleteSuccess(data));
    yield put(ProductsActions.onGetList(filters));
    if(merchant_id){
      yield put(MerchantActions.onGetListProduct({id:merchant_id}));
    }
  } catch (error) {
    console.log(error);
    message.error(get(error, "msg", "Error when Delete product!"));
    yield put(ProductsActions.onDeleteError(error));
  }
} */

/**
 *
 */
/* export function* watchGetList() {
  yield takeEvery(ProductsActionsTypes.GET_LIST, handleGetList);
}
*/
export function* watchGetProductOrder() {
  yield takeEvery(OrdersActionsTypes.GET_PRODUCT_ORDER, handleGetProductsOrder);
}
export function* watchCreate() {
  yield takeEvery(OrdersActionsTypes.ADD_ORDER, handleCreate);
}

export function* watchConfirmOrder() {
  yield takeEvery(OrdersActionsTypes.CONFIRM_ORDER, handleConfirmOrder);
}
export function* watchHistoryOrder() {
  yield takeEvery(OrdersActionsTypes.GET_HISTORY_ORDER, handleHistoryOrder);
}
/* export function* watchUpdateUserImage() {
  yield takeEvery(UsersActionsTypes.UPDATE_USER_IMAGE, handleUpdateUserImage);
} */
/* export function* watchDelete() {
  yield takeEvery(ProductsActionsTypes.DELETE, handleDelete);
} */

export default function* rootSaga() {
  yield all([
    /* fork(watchGetList),*/
    fork(watchGetProductOrder),
    fork(watchCreate),
    fork(watchConfirmOrder),
    fork(watchHistoryOrder),
    /* fork(watchUpdateUserImage), */
    /* fork(watchDelete), */
  ]);
}
