import { combineReducers } from "redux";

import address from "./address";
import auth from "./auth";
import brands from "./brands";
import categories from "./categories";
import cart from "./cart";
import color from "./color";
import currency from "./currency";
import order from "./order";
import operations from "./operations";
import products from "./products";
import review from "./review";
import ui from "./ui";
import user from "./user";

export default combineReducers({
  address, auth, brands, categories, cart, color, currency, order, operations, products, review, user, ui
});
