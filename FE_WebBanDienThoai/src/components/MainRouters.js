import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MyLoadable from "../utils/MyLoadable";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";

/* const IndexRoutes = MyLoadable({
  loader: () => import("./HomePage"),
});
const ProductRoutes = MyLoadable({
    loader: () => import("./ProductPage"),
  }); */

export default function MainRoutes() {
  return (
    <BrowserRouter>
        <Switch>
        {/* <Route path="/loan" component={LoanRoutes} /> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductPage} />
        <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  );
}
