import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import { getAllProducts, getDetailProduct, addProduct,updateProduct, deleteProduct } from "../apis/products";
import { addProductThumbnailImage} from "../apis/cloudinary";
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
  var {name, price, amount, pathseo, warrently, brand, category,bigimage, specifications} = payload.params;
  try {
    var result,image, imageArray;
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.params.bigimage && payload.formData){
      bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      image = yield call(addProductThumbnailImage, payload.formData);
      imageArray = image.data.images.map((item)=>{
        return item._id
      })
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "bigimage":bigimage.data.images[0]._id,
        "image": imageArray
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    else if(payload.params.bigimage){
      bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      console.log(bigimage)
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "bigimage":bigimage.data.images[0]._id
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      image = yield call(addProductThumbnailImage, payload.formData);
      imageArray = image.data.images.map((item)=>{
        return item._id
      })
      result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "image": imageArray
      });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    else{
      result = yield call(addProduct,{ name, price, amount, pathseo, warrently, category, brand, specifications });
      if (result.data.code !== 201) throw result.data;
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    yield put(ProductsActions.onGetList());
  } catch (error) {
    yield put(ProductsActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdateImage( {payload} ) {
  const {name, price, amount, pathseo, warrently, brand, category, specifications} = payload.params;
  try {
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.params.bigimage._id === undefined && payload.formData){
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand, specifications,
        "bigimage":bigimage.data.images[0]._id,
        "image": payload.params.image.concat(imageArray)
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    else if(payload.params.bigimage._id === undefined){
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "bigimage":bigimage.data.images[0]._id
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "image": payload.params.image.concat(imageArray)
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    else{
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand,specifications,
        "image": payload.params.image
      }, payload.id);
      if (result.data.code !== 200) throw result.data;
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    yield put(ProductsActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(ProductsActions.onUpdateImageError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
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
export function* watchUpdateImage() {
  yield takeEvery(ProductsActionTypes.UPDATE_IMAGE, handleUpdateImage);
}
export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdateImage),
    fork(watchDelete),
  ]);
}
