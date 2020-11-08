import { all } from "redux-saga/effects";
import products from "./products";

export default function* rootSaga(getState) {
  yield all([
    products()
  ]);
}
