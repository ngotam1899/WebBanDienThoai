import { takeEvery, fork, all, call, put, delay } from "redux-saga/effects";
import { get } from "lodash";
import SpecificationActions, { SpecificationActionTypes } from "../actions/specification";
import { getAllSpecifications } from "../apis/specification";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllSpecifications, payload);
    const data = get(result, "data");
    yield put(SpecificationActions.onGetListSuccess(data.specifications));
  } catch (error) {
    yield put(SpecificationActions.onGetListError(error));
  }
}


function* handleFilter({ payload }) {
  yield delay(2000);
  const { keyword } = payload;
  try {
    const result = yield call(getAllSpecifications, {keyword});
    const data = get(result, "data");
    yield put(SpecificationActions.onFilterSuccess(data.specifications));
  } catch (error) {
    //yield put(SpecificationActions.onGetListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(SpecificationActionTypes.GET_LIST, handleGetList);
}

export function* watchFilter() {
  yield takeEvery(SpecificationActionTypes.FILTER, handleFilter);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchFilter),
  ]);
}
