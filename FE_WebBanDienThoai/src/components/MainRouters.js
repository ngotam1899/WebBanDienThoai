import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../constants/routes';

const renderRoute = (routes) => {
	var result = null;
	var isLogin = localStorage.getItem("AUTH_USER")
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			if(route.redirect){
				return <Route key={index} path={route.path} component={route.main} exact={route.exact}>
					{!isLogin && <Redirect to={route.redirect} />}
				</Route>
			}
			else{
				return <Route key={index} path={route.path} component={route.main} exact={route.exact} />
			}
		});
	}
	return result;
};

class MainRoutes extends Component {
	render() {
		return <Switch>{renderRoute(routes)}</Switch>;
	}
}

export default MainRoutes;
