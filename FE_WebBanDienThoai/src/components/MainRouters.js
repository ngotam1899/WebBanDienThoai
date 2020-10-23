import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MyLoadable from "../utils/MyLoadable";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import NotFound from "./../containers/NotFound";
/* const IndexRoutes = MyLoadable({
  loader: () => import("./HomePage"),
});
const ProductRoutes = MyLoadable({
    loader: () => import("./ProductPage"),
  }); */

export default function MainRoutes() {
  return (
    
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products/dien-thoai" component={ProductPage} />
        <Route exact path="/carts" component={CartPage} />
        <Route exact path="/carts/checkout" component={CheckoutPage} />
        {/* <Redirect to="/" /> */}
        <Route component={NotFound} />
        </Switch>
    
  );
}
