import { all } from "redux-saga/effects";
import address from "./address";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import color from "./color";
import group from "./group";
import order from "./order";
import operations from "./operations";
import products from "./products";
import review from "./review";
import user from "./user";

export default function* rootSaga(getState) {
  yield all([
    address(), auth(), brands(), categories(), color(), group(), order(), operations(), products(), review(), user(),
  ]);
}
