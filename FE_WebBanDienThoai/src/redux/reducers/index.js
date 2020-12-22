import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import cloudinary from "./cloudinary";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import user from "./user";
import order from "./order";
import color from "./color";
import operations from "./operations";
import ui from "./ui";
import currency from "./currency";

export default combineReducers({
  products,cart, cloudinary, auth, brands, categories, user, order, color, ui, operations, currency
});
