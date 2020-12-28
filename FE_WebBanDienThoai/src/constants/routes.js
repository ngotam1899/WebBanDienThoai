/* Lưu ý: Tất cả Component khi import phải thêm vào thư viện React */
import React from 'react';
/* Lưu ý */
import HomePage from '../components/HomePage';
import ProductPage from '../components/ProductPage';
import CartPage from '../components/CartPage';
import CheckoutPage from '../components/CheckoutPage';
import NotFound from '../containers/NotFound';
import ActiveAccount from '../containers/ActiveAccount';
import ActiveOrder from '../containers/ActiveOrder';
import DetailPage from '../components/DetailPage';
import UserInfoPage from '../components/UserInfoPage';

const routes = [
	{
		path: '/',
		exact: true,
		name: "Home Page",
		main: () => <HomePage />
	},
	{
		path: '/products/:pathseo/:categoryID',
		exact: true,
		name: "Product Page",
		main: ({match, history, location}) => <ProductPage match={match} key={match.params.categoryID} history={history} location={location} />
	},
	{
		path: '/carts',
		exact: true,
		name: "Cart Page",
		main: ({history}) => <CartPage history={history} />
	},
	{
		path: '/carts/checkout',
		exact: true,
		name: "Checkout Page",
		main: () => <CheckoutPage />
	},
	{
		path: '/account/active/:token',
		exact: true,
		name: "Active Account",
		main: ({match}) => <ActiveAccount match={match} />
	},
	{
		path: '/account/detail',
		exact: true,
		name: "User Info",
		main: () => <UserInfoPage/>
	},
	{
		path: '/order/active/:token',
		exact: true,
		name: "Active Order",
		main: ({match}) => <ActiveOrder match={match}/>
	},
	{
		path: '/product/:pathseo/:productID',
		exact: true,
		name: "Detail Page",
		main: ({match}) => <DetailPage match={match} />
	},
	{
		path: '',
		exact: true,
		name: "404 Page",
		main: () => <NotFound />
	}
];

export default routes;
