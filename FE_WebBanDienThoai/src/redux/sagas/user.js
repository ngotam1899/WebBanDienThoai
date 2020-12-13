import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import UsersActions, { UsersActionTypes } from "../actions/user";
import { addUserImage, getUserImage } from "../apis/cloudinary";
import { updateUserInfo, getUser } from "../apis/user";

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
function* handleUpdateUserImage({payload}) {
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
}

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
  yield takeEvery(ProductsActionTypes.GET_LIST, handleGetList);
}
*/
/*
export function* watchCreate() {
  yield takeEvery(ProductsActionTypes.CREATE, handleCreate);
} */
export function* watchUpdateUserImage() {
  yield takeEvery(UsersActionTypes.UPDATE_USER_IMAGE, handleUpdateUserImage);
}
/* export function* watchDelete() {
  yield takeEvery(ProductsActionTypes.DELETE, handleDelete);
} */

export default function* rootSaga() {
  yield all([
    /* fork(watchGetList),*/
    /*fork(watchCreate), */
    fork(watchUpdateUserImage),
    /* fork(watchDelete), */
  ]);
}
