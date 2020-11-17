import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import cloudinary from "./cloudinary";

export default combineReducers({
  products,cart, cloudinary
});
