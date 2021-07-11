import {takeEvery, fork, all, call, put, delay} from 'redux-saga/effects';
import {get} from 'lodash';
import ProductsActions, {ProductsActionTypes} from '../actions/products';
import {
  getAllProducts,
  getDetailProduct,
  getBestSeller,
  getFavorite,
  getNewest,
  getLikeProducts,
  getRelateProducts,
  compareProduct,
} from '../apis/products';
import GroupActions from '../actions/group';

function* handleCompare({payload}) {
  try {
    const result = yield call(compareProduct, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onCompareSuccess(data.products));
  } catch (error) {
    yield put(ProductsActions.onCompareError(error));
  }
}

function* handleCompareFilter({payload}) {
  try {
    yield delay(1000);
    var result = yield call(getAllProducts, {
      ...payload,
      limit: 5,
      active: 1,
    });
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onCompareFilterSuccess(data.products));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetList({payload}) {
  try {
    const result = yield call(getAllProducts, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetListSuccess(data.products, data.total));
  } catch (error) {
    yield put(ProductsActions.onGetListError(error));
  }
}

function* handleGetBestSeller({payload}) {
  try {
    const result = yield call(getBestSeller, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetBestSellerSuccess(data.products));
  } catch (error) {
    yield put(ProductsActions.onGetBestSellerError(error));
  }
}

function* handleGetFavorite({payload}) {
  try {
    const result = yield call(getFavorite, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetFavoriteSuccess(data.products));
  } catch (error) {
    yield put(ProductsActions.onGetFavoriteError(error));
  }
}

function* handleGetNewest({payload}) {
  try {
    const result = yield call(getNewest, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetNewestSuccess(data.products));
  } catch (error) {
    yield put(ProductsActions.onGetNewestError(error));
  }
}

function* handleFilter({payload}) {
  try {
    yield delay(1000);
    const {keyword} = payload;
    const result = yield call(getAllProducts, {
      keyword,
      limit: 4,
      active: 1,
    });
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onFilterSuccess(data.products));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetDetail({filters, id}) {
  try {
    const result = yield call(getDetailProduct, id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetDetailSuccess(data.product));
    if (data.product.group)
      yield put(GroupActions.onGetDetail(data.product.group._id));
  } catch (error) {
    yield put(ProductsActions.onGetDetailError(error));
  }
}

function* handleGetLike({id}) {
  try {
    const result = yield call(getLikeProducts, id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetLikeSuccess(data.result));
  } catch (error) {
    yield put(ProductsActions.onGetLikeError(error));
  }
}

function* handleGetRelate({id}) {
  try {
    const result = yield call(getRelateProducts, id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onGetRelateSuccess(data.result));
  } catch (error) {
    yield put(ProductsActions.onGetRelateError(error));
  }
}
/**
 *
 */
export function* watchGetList() {
  yield takeEvery(ProductsActionTypes.GET_LIST, handleGetList);
}
export function* watchGetBestSeller() {
  yield takeEvery(ProductsActionTypes.GET_BEST_SELLER, handleGetBestSeller);
}
export function* watchGetFavorite() {
  yield takeEvery(ProductsActionTypes.GET_FAVORITE, handleGetFavorite);
}
export function* watchGetNewest() {
  yield takeEvery(ProductsActionTypes.GET_NEWEST, handleGetNewest);
}
export function* watchGetDetail() {
  yield takeEvery(ProductsActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchFilter() {
  yield takeEvery(ProductsActionTypes.FILTER, handleFilter);
}
export function* watchGetRelate() {
  yield takeEvery(ProductsActionTypes.GET_RELATE, handleGetRelate);
}
export function* watchGetLike() {
  yield takeEvery(ProductsActionTypes.GET_LIKE, handleGetLike);
}
export function* watchCompare() {
  yield takeEvery(ProductsActionTypes.COMPARE, handleCompare);
}
export function* watchCompareFilter() {
  yield takeEvery(ProductsActionTypes.COMPARE_FILTER, handleCompareFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetBestSeller),
    fork(watchGetFavorite),
    fork(watchGetNewest),
    fork(watchGetLike),
    fork(watchGetRelate),
    fork(watchGetDetail),
    fork(watchFilter),
    fork(watchCompareFilter),
    fork(watchCompare),
  ]);
}
