import { takeEvery, fork, all, call, put, delay, select } from "redux-saga/effects";
import { get } from "lodash";
import GroupActions, { GroupActionTypes } from "../actions/group";
import ProductsActions from "../actions/products";
import { getAllGroups,  getDetailGroup, addGroup, updateGroup, deleteGroup } from "../apis/group";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllGroups, payload);
    const data = get(result, "data");
    yield put(GroupActions.onGetListSuccess(data.groups));
  } catch (error) {
    yield put(GroupActions.onGetListError(error));
  }
}


function* handleFilter({ payload }) {
  yield delay(2000);
  const { keyword } = payload;
  try {
    const result = yield call(getAllGroups, {keyword});
    const data = get(result, "data");
    yield put(GroupActions.onFilterSuccess(data.groups));
  } catch (error) {
  }
}

function* handleGetDetail({ id }) {
  try {
    const result = yield call(getDetailGroup, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(GroupActions.onGetDetailSuccess(data.group));
  } catch (error) {
    yield put(GroupActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addGroup, payload.params);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(GroupActions.onCreateSuccess(data.group));
/*     let product = yield select(state => state.products.detail);
    yield put(ProductsActions.onUpdateImage({
      id: product._id,
      params: {group: data.group._id},
      formData: null})); */
  } catch (error) {
    yield put(GroupActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateGroup, payload.params, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    const detailResult = yield call(getDetailGroup, payload.id);
    yield put(GroupActions.onUpdateSuccess(get(detailResult, "data")));
    let product = yield select(state => state.products.detail);
    if(product) yield put(ProductsActions.onGetDetail(product._id));
  } catch (error) {
    yield put(GroupActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id }) {
  try {
    const result = yield call(deleteGroup, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(GroupActions.onDeleteSuccess(data));
    yield put(GroupActions.onGetList());
  } catch (error) {
    yield put(GroupActions.onDeleteError(error));
  }
}

export function* watchGetDetail() {
  yield takeEvery(GroupActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(GroupActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(GroupActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(GroupActionTypes.DELETE, handleDelete);
}
export function* watchGetList() {
  yield takeEvery(GroupActionTypes.GET_LIST, handleGetList);
}
export function* watchFilter() {
  yield takeEvery(GroupActionTypes.FILTER, handleFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchFilter),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
