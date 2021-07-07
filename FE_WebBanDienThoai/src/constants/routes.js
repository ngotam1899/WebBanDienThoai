import React from 'react';

import ActiveAccount from '../containers/ActiveAccount';
import ActiveOrder from '../containers/ActiveOrder';
import ActivePassword from '../containers/ActivePassword';
import AccessoryPage from '../components/AccessoryPage';
import CartPage from '../components/CartPage';
import CheckoutPage from '../components/CheckoutPage';
import ComparePage from '../components/ComparePage';
import DetailPage from '../components/DetailPage';
import HomePage from '../components/HomePage';
import InstallmentPage from '../components/InstallmentPage';
import NotFound from '../containers/NotFound';
import NotificationPage from '../components/NotificationPage';
import ProductPage from '../components/ProductPage';
import PromotionPage from '../components/PromotionPage';
import PurchasePage from '../components/PurchasePage';
import SearchPage from '../components/SearchPage';
import UserInfoPage from '../components/UserInfoPage';
import UserInstallmentPage from '../components/UserInstallmentPage';

const routes = [
	{
		path: '/',
		exact: true,
		name: "Home Page",
		main: () => <HomePage />
	},
	{
		path: '/search',
		exact: true,
		name: "Search",
		main: ({match, location, history}) => <SearchPage match={match} location={location} history={history}/>
	},
	{
		path: '/products/:pathseo.:categoryID',
		exact: true,
		name: "Product Page",
		main: ({match, history, location}) => <ProductPage match={match} key={match.params.categoryID} history={history} location={location} />
	},
	{
		path: '/products/accessories',
		exact: true,
		name: "Accessory Page",
		main: ({history, location}) => <AccessoryPage history={history} location={location}/>
	},
	{
		path: '/carts',
		exact: true,
		name: "Cart Page",
		main: ({history}) => <CartPage history={history} />
	},
	{
		path: '/promotion',
		exact: true,
		name: "Promotion Page",
		main: ({history}) => <PromotionPage history={history} />
	},
	{
		path: '/carts/checkout',
		exact: true,
		name: "Checkout Page",
		redirect: '/',
		main: () => <CheckoutPage />
	},
	{
		path: '/account/active/:token',
		exact: true,
		name: "Active Account",
		main: ({match}) => <ActiveAccount match={match} />
	},
	{
		path: '/account/active-password/:token',
		exact: true,
		name: "Active Password",
		main: ({match}) => <ActivePassword match={match} />
	},
	{
		path: '/account/detail',
		exact: true,
		name: "User Info",
		redirect: '/',
		main: () => <UserInfoPage/>
	},
	{
		path: '/account/installment',
		exact: true,
		name: "User Installment Page",
		redirect: '/',
		main: ({history, location}) => <UserInstallmentPage history={history} location={location}/>
	},
	{
		path: '/account/purchase',
		exact: true,
		name: "Purchase",
		redirect: '/',
		main: ({history, location}) => <PurchasePage history={history} location={location}/>
	},
	{
		path: '/account/notification',
		exact: true,
		name: "Notification",
		redirect: '/',
		main: ({history, location}) => <NotificationPage history={history} location={location}/>
	},
	{
		path: '/order/active/:token',
		exact: true,
		name: "Active Order",
		main: ({match}) => <ActiveOrder match={match}/>
	},
	{
		path: '/product/:pathseo.:productID',
		exact: true,
		name: "Detail Page",
		main: ({match, history, location}) => <DetailPage match={match} history={history} location={location}/>
	},
	{
		path: '/compare/:categoryID',
		exact: true,
		name: "Compare Page",
		main: ({match, history, location}) => <ComparePage match={match} history={history} location={location}/>
	},
	{
		path: '/installment/:pathseo.:productID.:colorID',
		exact: true,
		name: "Installment Page",
		main: ({match}) => <InstallmentPage match={match}/>
	},
	{
		path: '',
		exact: true,
		name: "404 Page",
		main: () => <NotFound />
	}
];

export default routes;
