import { combineReducers } from "redux";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";

export default combineReducers({
  products, cloudinary, brands, categories,
});
