import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../constants/routes';

const renderRoute = (routes) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return <Route key={index} path={route.path} component={route.main} exact={route.exact} />;
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
