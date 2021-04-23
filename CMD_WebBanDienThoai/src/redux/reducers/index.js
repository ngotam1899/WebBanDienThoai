import { combineReducers } from "redux";
import products from "./products";
import cloudinary from "./cloudinary";
import brands from "./brands";
import categories from "./categories";
import group from "./group";
import operations from "./operations";
import color from "./color";
import user from "./user";
import order from "./order";
import specification from "./specification";
import ui from "./ui";
import state from "./state";

export default combineReducers({
  products, cloudinary, brands, categories, group, operations, color, user, order, specification, ui, state
});
