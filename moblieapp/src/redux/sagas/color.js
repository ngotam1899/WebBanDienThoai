import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import ColorActions, { ColorActionTypes } from "../actions/color";
import { getAllColors } from "../apis/color";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllColors, payload);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(ColorActions.onGetListSuccess(data.colors));
  } catch (error) {
    yield put(ColorActions.onGetListError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(ColorActionTypes.GET_LIST, handleGetList);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
