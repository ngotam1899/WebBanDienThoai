import { combineReducers } from "redux";

import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import cloudinary from "./cloudinary";
import color from "./color";
import group from "./group";
import order from "./order";
import products from "./products";
import specification from "./specification";
import state from "./state";
import ui from "./ui";
import user from "./user";

export default combineReducers({
  auth, brands, categories, cloudinary, color, group, order, products, specification, state, ui, user,
});
