import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";

export default function* rootSaga(getState) {
  yield all([
    products(), cloudinary(), brands(), categories(),
  ]);
}
