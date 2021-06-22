import { all } from "redux-saga/effects";

import ad from "./ad";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import color from "./color";
import group from "./group";
import installment from "./installment";
import notification from "./notification";
import order from "./order";
import products from "./products";
import review from "./review";
import specification from "./specification";
import user from "./user";

export default function* rootSaga(getState) {
  yield all([
    ad(),
    auth(),
    brands(),
    categories(),
    color(),
    group(),
    installment(),
    order(),
    notification(),
    products(),
    review(),
    specification(),
    user(),
  ]);
}
