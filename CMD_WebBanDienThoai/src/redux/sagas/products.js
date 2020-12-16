import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import { getAllProducts, getDetailProduct, addProduct,updateProduct, deleteProduct } from "../apis/products";
import UIActions from "../actions/ui";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    yield delay(1000)
    const result = yield call(getAllProducts, payload);
    const data = get(result, "data");
    yield put(ProductsActions.onGetListSuccess(data.product));
  } catch (error) {
    yield put(ProductsActions.onGetListError(error));
  }
  yield put(UIActions.hideLoading());
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailProduct, id);
    const data = get(result, "data", {});
    yield put(ProductsActions.onGetDetailSuccess(data.product));
  } catch (error) {
    yield put(ProductsActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate( {payload} ) {
  try {
    const result = yield call(addProduct, payload);
    const data = get(result, "data", {});
    yield put(ProductsActions.onCreateSuccess(data));
    yield put(ProductsActions.onGetList());
  } catch (error) {
    yield put(ProductsActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate( {payload} ) {
  try {
    const result = yield call(updateProduct, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailProduct, payload.id);
    console.log("detailProduct",payload.id);
    yield put(ProductsActions.onUpdateSuccess(get(detailResult, "data.product")));
    yield put(ProductsActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(ProductsActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    console.log("id", id);
    const result = yield call(deleteProduct, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onDeleteSuccess(data));
    yield put(ProductsActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(ProductsActions.onDeleteError(error));
  }
}

/**
 *
 */
export function* watchGetList() {
  yield takeEvery(ProductsActionTypes.GET_LIST, handleGetList);
}

 export function* watchGetDetail() {
  yield takeEvery(ProductsActionTypes.GET_DETAIL, handleGetDetail);
}

export function* watchCreate() {
  yield takeEvery(ProductsActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(ProductsActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
