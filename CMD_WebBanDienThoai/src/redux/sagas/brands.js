import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import BrandActions, { BrandActionTypes } from "../actions/brands";
import { getAllBrands, getDetailBrand, addBrand, updateBrand, deleteBrand } from "../apis/brands";
import { addImage} from "../apis/cloudinary";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllBrands, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetListSuccess(data.brands));
  } catch (error) {
    yield put(BrandActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailBrand, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(BrandActions.onGetDetailSuccess(data.category));
  } catch (error) {
    yield put(BrandActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  const {name, image} = payload.params;
  try {
    var data;
    if(image){
      var imageResult = yield call(addImage, image);
      var result = yield call(addBrand,
        { name, image: imageResult.data.images[0]._id });
      data = get(result, "data", {});
      if (data.code !== 201) throw data;
      yield put(BrandActions.onCreateSuccess(get(result, "data.brand")));
    }
    else{
      const result = yield call(addBrand, payload.params);
      data = get(result, "data", {});
      if (data.code !== 201) throw data;
      yield put(BrandActions.onCreateSuccess(data.brand));
    }
    yield put(BrandActions.onGetList());
  } catch (error) {
    yield put(BrandActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  const {image} = payload.params;
  console.log(payload.params)
  try {
    var detailResult;
    if(image){
      var imageResult = yield call(addImage, image);
      var result = yield call(updateBrand,{image: imageResult.data.images[0]._id }, payload.id);
      const data = get(result, "data", {});
      if (data.code !== 200) throw data;
      detailResult = yield call(getDetailBrand, payload.id);
      yield put(BrandActions.onUpdateSuccess(get(detailResult, "data.brand")));
    }
    else{
      const result = yield call(updateBrand, payload.params, payload.id);
      const data = get(result, "data", {});
      if (data.code !== 200) throw data;
      detailResult = yield call(getDetailBrand, payload.id);
      yield put(BrandActions.onUpdateSuccess(get(detailResult, "data.brand")));
    }
    yield put(BrandActions.onGetList());
  } catch (error) {
    console.log(error);
    yield put(BrandActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteBrand, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(BrandActions.onDeleteSuccess(data));
    yield put(BrandActions.onGetList());
  } catch (error) {
    yield put(BrandActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(BrandActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(BrandActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(BrandActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(BrandActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(BrandActionTypes.DELETE, handleDelete);
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
