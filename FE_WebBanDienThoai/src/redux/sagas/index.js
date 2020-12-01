import { all } from "redux-saga/effects";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import auth from "./auth";

export default function* rootSaga(getState) {
  yield all([
    products(), cloudinary(), brands(), categories(), auth()
  ]);
}
