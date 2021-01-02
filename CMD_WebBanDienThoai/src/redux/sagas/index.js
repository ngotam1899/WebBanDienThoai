import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import operations from "./operations";
import color from "./color";
import user from "./user";
import order from "./order";

export default function* rootSaga(getState) {
  yield all([
    cloudinary(), brands(), categories(), products(), color(), operations(), user(), order()
  ]);
}
