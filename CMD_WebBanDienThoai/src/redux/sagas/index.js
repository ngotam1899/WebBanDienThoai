import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";

export default function* rootSaga(getState) {
  yield all([
    products(), cloudinary()
  ]);
}
