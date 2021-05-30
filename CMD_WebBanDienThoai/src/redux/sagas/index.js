import { all } from "redux-saga/effects";

import auth from "./auth";
import products from "./products";
import brands from "./brands";
import categories from "./categories";
import group from "./group";
import color from "./color";
import user from "./user";
import order from "./order";
import specification from "./specification";

export default function* rootSaga(getState) {
  yield all([
    auth(), brands(), categories(), color(), group(), order(), specification(), products(), user(),
  ]);
}
