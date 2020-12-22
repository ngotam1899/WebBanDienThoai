import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import auth from "./auth";
import user from "./user";
import order from "./order";
import color from "./color";
import operations from "./operations";

export default function* rootSaga(getState) {
  yield all([
    products(), cloudinary(), brands(), categories(), auth(), user(), order(), color(), operations()
  ]);
}
