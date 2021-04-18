import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UIActions from "../actions/ui";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import { getAllProducts, getDetailProduct } from "../apis/products";

function* handleGetList({ payload }) {
  yield put(UIActions.showLoading());
  try {
    const result = yield call(getAllProducts, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetListSuccess(data.products, data.total));
  } catch (error) {
    yield put(ProductsActions.onGetListError(error));
  }
  yield put(UIActions.hideLoading());
}

function* handleFilter({ payload }) {
  yield delay(2000);
  const { keyword } = payload;
  yield put(
    ProductsActions.onGetList({
      keyword,
      limit: 4,
      active: 1
    }),
  );
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailProduct, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetDetailSuccess(data.product));
  } catch (error) {
    yield put(ProductsActions.onGetDetailError(error));
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
export function* watchFilter() {
  yield takeEvery(ProductsActionTypes.FILTER, handleFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchFilter),
  ]);
}
