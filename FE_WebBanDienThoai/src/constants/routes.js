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

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomePage />
	},
	{
		path: '/products/dien-thoai',
		exact: true,
		main: () => <ProductPage />
	},
	{
		path: '/carts',
		exact: true,
		main: () => <CartPage />
	},
	{
		path: '/carts/checkout',
		exact: true,
		main: () => <CheckoutPage />
	},
	{
		path: '/products/dien-thoai/:productID',
		exact: true,
		main: ({match}) => <DetailPage match={match} />
	},
	{
		path: '/account/active/:token',
		exact: true,
		main: ({match}) => <ActiveAccount match={match} />
	},
	{
		path: '/order/active/:token',
		exact: true,
		main: () => <ActiveOrder />
	},
	{
		path: '/products/dien-thoai/:productID',
		exact: true,
		main: ({match}) => <DetailPage match={match} />
	},
	{
		path: '',
		exact: true,
		main: () => <NotFound />
	}
];

export default routes;
