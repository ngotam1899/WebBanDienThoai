import { all } from "redux-saga/effects";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import auth from "./auth";
import user from "./user";
import order from "./order";
import color from "./color";
import operations from "./operations";
import address from "./address";

export default function* rootSaga(getState) {
  yield all([
    products(), brands(), categories(), auth(), user(), order(), color(), operations(), address()
  ]);
}
