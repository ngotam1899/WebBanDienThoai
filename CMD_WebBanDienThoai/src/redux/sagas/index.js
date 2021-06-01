import { all } from "redux-saga/effects";

import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import color from "./color";
import group from "./group";
import notification from "./notification";
import order from "./order";
import products from "./products";
import specification from "./specification";
import user from "./user";

export default function* rootSaga(getState) {
  yield all([
    auth(), brands(), categories(), color(), group(), order(), notification(), products(), specification(), user(),
  ]);
}
