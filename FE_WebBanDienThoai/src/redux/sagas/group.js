import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import GroupActions, { GroupActionTypes } from "../actions/group";
import { getProductGroup } from "../apis/group";

function* handleGetDetail({id}) {
  try {
    const result = yield call(getProductGroup, id);
    const data = get(result, "data");
    if (data.code !== 200) throw data;
    yield put(GroupActions.onGetDetailSuccess(data.group));
  } catch (error) {
    yield put(GroupActions.onGetDetailError(error));
  }
}


/**
 *
 */

export function* watchGetDetail() {
  yield takeEvery(GroupActionTypes.GET_DETAIL, handleGetDetail);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetDetail),
  ]);
}
