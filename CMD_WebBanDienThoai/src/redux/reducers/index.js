import { combineReducers } from "redux";

import ad from "./ad";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import cloudinary from "./cloudinary";
import color from "./color";
import group from "./group";
import notification from "./notification";
import order from "./order";
import products from "./products";
import specification from "./specification";
import state from "./state";
import ui from "./ui";
import user from "./user";

export default combineReducers({
  ad, auth, brands, categories, cloudinary, color, group, notification, order, products, specification, state, ui, user,
});
