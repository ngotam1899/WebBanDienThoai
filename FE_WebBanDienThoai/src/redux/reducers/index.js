import { combineReducers } from "redux";

import ad from "./ad";
import address from "./address";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import cart from "./cart";
import color from "./color";
import currency from "./currency";
import group from "./group";
import installment from "./installment";
import notification from "./notification";
import order from "./order";
import products from "./products";
import review from "./review";
import ui from "./ui";
import user from "./user";

export default combineReducers({
  ad, 
  address, 
  auth, 
  brands, 
  categories, 
  cart, 
  color, 
  currency, 
  group, 
  installment, 
  notification, 
  order, 
  products, 
  review, 
  user, 
  ui,
});
