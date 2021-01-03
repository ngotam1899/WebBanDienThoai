import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import ProductsActions, { ProductsActionTypes } from "../actions/products";
import ImagesActions from "../actions/cloudinary";
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
  var {name, price, amount, pathseo, warrently, brand, category, detail_info,bigimage} = payload.params;
  try {
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.params.bigimage && payload.formData){
      console.log("1")
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, brand, detail_info,
        "bigimage":bigimage.data.images[0]._id,
        "image": imageArray
      });
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    else if(payload.params.bigimage){
      console.log("2")
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      console.log(bigimage)
      var result = yield call(addProduct,
        { name, price, amount, pathseo, warrently, category, detail_info, brand,
          "bigimage":bigimage.data.images[0]._id
        });
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      console.log("3")
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(addProduct,
      { name, price, amount, pathseo, warrently, category, detail_info, brand,
        "image": imageArray
      });
      yield put(ProductsActions.onCreateSuccess(get(result, "data.product")));
    }
    else{
      console.log("4")
      var result = yield call(addProduct,{ name, price, amount, pathseo, warrently, category, detail_info, brand });
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
  const {name, price, amount, pathseo, warrently, brand, category, detail_info} = payload.params;
  try {
    // 1. TH1: Nếu có bigimge mới và image mới thì tạo mới cả 2 rồi thêm thông tin mới cho cả 2
    if(payload.params.bigimage._id === undefined && payload.formData){
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, brand, detail_info,
        "bigimage":bigimage.data.images[0]._id,
        "image": payload.params.image.concat(imageArray)
      }, payload.id);
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 2. TH2: Nếu bigimge mới
    else if(payload.params.bigimage._id === undefined){
      var bigimage = yield call(addProductThumbnailImage, payload.params.bigimage);
      var result = yield call(updateProduct,
        { name, price, amount, pathseo, warrently, category, detail_info, brand,
          "bigimage":bigimage.data.images[0]._id
        }, payload.id);
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    // 3. TH3: Nếu image mới
    else if(payload.formData){
      var image = yield call(addProductThumbnailImage, payload.formData);
      var imageArray = image.data.images.map((item)=>{
        return item._id
      })
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, detail_info, brand,
        "image": payload.params.image.concat(imageArray)
      }, payload.id);
      yield put(ProductsActions.onUpdateImageSuccess(get(result, "data.product")));
    }
    else{
      var result = yield call(updateProduct,
      { name, price, amount, pathseo, warrently, category, detail_info, brand,
        "image": payload.params.image
      }, payload.id);
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
