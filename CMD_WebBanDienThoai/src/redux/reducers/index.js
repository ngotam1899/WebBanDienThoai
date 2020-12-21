import { combineReducers } from "redux";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import ui from "./ui";
import operations from "./operations";
import color from "./color";

export default combineReducers({
  products, cloudinary, brands, categories, ui, operations, color,
});
