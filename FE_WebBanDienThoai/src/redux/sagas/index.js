import { all } from "redux-saga/effects";
import auth from "./auth";

export default function* rootSaga(getState) {
  yield all([
    auth()
  ]);
}
