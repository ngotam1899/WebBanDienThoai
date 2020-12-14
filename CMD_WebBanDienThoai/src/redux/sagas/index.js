import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import display from "./display";

export default function* rootSaga(getState) {
  yield all([
    cloudinary(), brands(), categories(), products(), display()
  ]);
}
