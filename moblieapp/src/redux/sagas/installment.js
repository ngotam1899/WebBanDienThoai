import {takeEvery, fork, all, call, put} from 'redux-saga/effects';
import {get} from 'lodash';
import InstallmentActions, {
  InstallmentActionTypes,
} from '../actions/installment';
import {
  getAllInstallments,
  getDetailInstallment,
  addInstallment,
  updateInstallment,
  deleteInstallment,
} from '../apis/installment';

function* handleGetList({payload}) {
  try {
    const result = yield call(getAllInstallments, payload);
    const data = get(result, 'data');
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onGetListSuccess(data.installments));
  } catch (error) {
    yield put(InstallmentActions.onGetListError(error));
  }
}

function* handleGetDetail({filters, id}) {
  try {
    const result = yield call(getDetailInstallment, id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onGetDetailSuccess(data.installment));
  } catch (error) {
    yield put(InstallmentActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({payload}) {
  try {
    const result = yield call(addInstallment, payload.params);
    const data = get(result, 'data', {});
    if (data.code !== 201) throw data;
    yield put(InstallmentActions.onCreateSuccess(data.installment));
    yield put(InstallmentActions.onGetList());
  } catch (error) {
    yield put(InstallmentActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({payload}) {
  try {
    console.log(payload);
    const result = yield call(updateInstallment, payload.data, payload.id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onUpdateSuccess(get('data')));
    yield put(InstallmentActions.onGetList(payload.params));
    if (payload.data.money)
      yield put(InstallmentActions.onGetDetail(payload.id));
  } catch (error) {
    yield put(InstallmentActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({id}) {
  try {
    const result = yield call(deleteInstallment, id);
    const data = get(result, 'data', {});
    if (data.code !== 200) throw data;
    yield put(InstallmentActions.onDeleteSuccess(data));
    yield put(InstallmentActions.onGetList());
  } catch (error) {
    yield put(InstallmentActions.onDeleteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(InstallmentActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(InstallmentActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(InstallmentActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(InstallmentActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(InstallmentActionTypes.DELETE, handleDelete);
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
