import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ColorActions, { ColorActionTypes } from "../actions/color";
import { getAllColors } from "../apis/color";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllColors, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ColorActions.onGetListSuccess(data.colors));
  } catch (error) {
    yield put(ColorActions.onGetListError(error));
  }
}

/**
 *
 * create
 */
/* function* handleCreate({ payload, filters, callback, merchant_id }) {
  console.log("load",payload);
  try {
    const result = yield call(EcommerceApi.Product.create, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    message.success("Create product success!");
    if (callback) {
      callback();
    }
    yield put(ProductsActions.onCreateSuccess(data));
    yield put(ProductsActions.onGetList(filters));
    if(merchant_id){
      yield put(MerchantActions.onGetListProduct({id:merchant_id}));
    }
  } catch (error) {
    console.log(error);
    message.error(get(error, "msg", "Error when create product!"));
    yield put(ProductsActions.onCreateError(error));
  }
} */

/**
 *
 * update
 */
/* function* handleUpdate({ payload, filters, callback, merchant_id }) {

  try {
    const result = yield call(EcommerceApi.Product.update, payload);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    message.success("Update product success!");
    if (callback) {
      callback();
    }

    const detailResult = yield call(EcommerceApi.Product.getDetail, payload.id);
    yield put(ProductsActions.onUpdateSuccess(get(detailResult, "data")));
    yield put(ProductsActions.onGetList(filters));
    if(merchant_id){
      yield put(MerchantActions.onGetListProduct({id:merchant_id}));
    }
  } catch (error) {
    console.log(error);
    message.error(get(error, "msg", "Error when Update product!"));
    yield put(ProductsActions.onUpdateError(error));
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

export function* watchGetList() {
  yield takeEvery(ColorActionTypes.GET_LIST, handleGetList);
}

/*
export function* watchCreate() {
  yield takeEvery(ProductsActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(ProductsActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
} */

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    /* fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete), */
  ]);
}
