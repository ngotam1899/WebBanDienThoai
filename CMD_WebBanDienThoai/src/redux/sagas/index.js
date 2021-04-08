import { all } from "redux-saga/effects";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import operations from "./operations";
import color from "./color";
import user from "./user";
import order from "./order";
import specification from "./specification";

export default function* rootSaga(getState) {
  yield all([
    brands(), categories(), products(), color(), operations(), user(), order(), specification()
  ]);
}
