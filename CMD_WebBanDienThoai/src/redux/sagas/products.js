import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import { getAllProducts, getDetailProduct, addProduct,updateProduct, deleteProduct, activateProduct, deactivateProduct } from "../apis/products";
import { addImage } from "../apis/cloudinary";
import UIActions from "../actions/ui";

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

function* handleGetDetail({ id }) {
  try {
    const result = yield call(getDetailProduct, id);
    const data = get(result, "data", {});
    yield put(ProductsActions.onGetDetailSuccess(data.product));
  } catch (error) {
    yield put(ProductsActions.onGetDetailError(error));
  }
}

function* handleFilter({ payload }) {
  yield delay(2000);
  const { keyword } = payload;
  try {
    const result = yield call(getAllProducts, {keyword});
    const data = get(result, "data");
    yield put(ProductsActions.onFilterSuccess(data.products));
  } catch (error) {
  }
}

/**
 *
 * create
 */
function* handleCreate( {payload} ) {
  var {name, price, amount, pathseo, warrently, brand, category,bigimage, specifications, colors, description, desc_text, weight,
    height, circumstance, included,
    width,
    length, group} = payload.data;
  var params = payload.params;
  try {
    var result,image, imageArray;
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.data.bigimage && payload.formData){
      bigimage = yield call(addImage, payload.data.bigimage);
      image = yield call(addImage, payload.formData);
      imageArray = image.data.images.map((item)=>{
        return item._id
      })
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group, weight,
        height, circumstance, included,
        width,
        length,
        "bigimage":bigimage.data.images[0]._id,
        "image": imageArray
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    else if(payload.data.bigimage){
      bigimage = yield call(addImage, payload.data.bigimage);
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group, weight,
        height, circumstance, included,
        width,
        length,
        "bigimage":bigimage.data.images[0]._id
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      image = yield call(addImage, payload.formData);
      imageArray = image.data.images.map((item)=>{
        return item._id
      })
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group,weight,
        height, circumstance, included,
        width,
        length,
        "image": imageArray
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    else{
      result = yield call(addProduct,{ name, price, amount, pathseo, warrently, category, brand, specifications, colors, description, desc_text, group,
        weight, circumstance, included,
        height,
        width,
        length, });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    yield put(ProductsActions.onGetDetail(result.data.product._id));
    yield put(ProductsActions.onGetList(params));
  } catch (error) {
    yield put(ProductsActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdateImage( {payload} ) {
  var {name, price, amount, pathseo, warrently, brand, category, specifications, colors, description, desc_text, group, weight,
    height, circumstance, included,
    width,
    length,} = payload.data;
  var params = payload.params;
  try {
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.data.bigimage._id === undefined && payload.formData){
      var bigimage = yield call(addImage, payload.data.bigimage);
      var image = yield call(addImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand, specifications, colors, description, desc_text, group, weight,
        height, circumstance, included,
        width,
        length,
        "bigimage":bigimage.data.images[0]._id,
        "image": payload.data.image.concat(imageArray)
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    /* eslint-disable */
    else if(payload.data.bigimage._id === undefined){
      var bigimage = yield call(addImage, payload.data.bigimage);
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group, weight,
        height, circumstance, included,
        width,
        length,
        "bigimage":bigimage.data.images[0]._id
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      var image = yield call(addImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group, weight,
        height, circumstance, included,
        width,
        length,
        "image": payload.data.image.concat(imageArray)
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    /* eslint-disable */
    else{
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications, colors, description, desc_text, group,weight,
        height, circumstance, included,
        width,
        length,
        "image": payload.data.image
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    yield put(ProductsActions.onGetDetail(payload.id));
    yield put(ProductsActions.onGetList(params));
  } catch (error) {
    yield put(ProductsActions.onUpdateImageError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteProduct, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onDeleteSuccess(data));
    yield put(ProductsActions.onGetList(params));
  } catch (error) {
    yield put(ProductsActions.onDeleteError(error));
  }
}

function* handleActivate({id, params}) {
  try {
    const result = yield call(activateProduct, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onActivateSuccess(data));
    yield put(ProductsActions.onGetList(params));
  } catch (error) {
    yield put(ProductsActions.onActivateError(error));
  }
}

function* handleDeactivate({id, params}) {
  try {
    const result = yield call(deactivateProduct, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(ProductsActions.onDeactivateSuccess(data));
    yield put(ProductsActions.onGetList(params));
  } catch (error) {
    yield put(ProductsActions.onDeactivateError(error));
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
export function* watchUpdateImage() {
  yield takeEvery(ProductsActionTypes.UPDATE_IMAGE, handleUpdateImage);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
}
export function* watchFilter() {
  yield takeEvery(ProductsActionTypes.FILTER, handleFilter);
}
export function* watchActivate() {
  yield takeEvery(ProductsActionTypes.ACTIVATE, handleActivate);
}
export function* watchDeactivate() {
  yield takeEvery(ProductsActionTypes.DEACTIVATE, handleDeactivate);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchFilter),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdateImage),
    fork(watchDelete),
    fork(watchActivate),
    fork(watchDeactivate),
  ]);
}
