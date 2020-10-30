import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MyLoadable from "../utils/MyLoadable";

import routes from '../constants/routes';
/* const IndexRoutes = MyLoadable({
  loader: () => import("./HomePage"),
});
const ProductRoutes = MyLoadable({
    loader: () => import("./ProductPage"),
  }); */

const renderRoute = (routes) => {
  var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} component={route.main} exact={route.exact}/>
      )});
    }
    return result;
}

export default function MainRoutes() {
  return (
        <Switch>
          {renderRoute(routes)}
        </Switch>
  );
}
