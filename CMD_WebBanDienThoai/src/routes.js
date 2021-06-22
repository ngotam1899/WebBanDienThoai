import React from 'react';

const AdList = React.lazy(() => import('./components/Ads/AdList'));
const BrandList = React.lazy(() => import('./components/Brands/BrandList'));
const CategoryList = React.lazy(() => import('./components/Categories/CategoryList'));
const ColorList = React.lazy(() => import('./components/Colors/ColorList'));
const GroupList = React.lazy(() => import('./components/Group/GroupList'));
const InstallmentList = React.lazy(() => import('./components/Installments/InstallmentList'));
const NotificationList = React.lazy(() => import('./components/Notifications/NotificationList'));
const OrderList = React.lazy(() => import('./components/Orders/OrderList'));
const ProductList = React.lazy(() => import('./components/Products/ProductList'));
const ReviewList = React.lazy(() => import('./components/Reviews/ReviewList'));
const SpecificationList = React.lazy(() => import('./components/Specification/SpecificationList'));
const UserList = React.lazy(() => import('./components/Users/UserList'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/products/product-manage', name: 'Product List', component: ProductList },
  { path: '/products/category-manage', name: 'Category List', component: CategoryList },
  { path: '/products/brand-manage', name: 'Brand List', component: BrandList },
  { path: '/products/color-manage', name: 'Color List', component: ColorList },
  { path: '/products/group-manage', name: 'Group List', component: GroupList },
  { path: '/products/specification-manage', name: 'Specification List', component: SpecificationList },
  { path: '/products/ad-manage', name: 'Ad List', component: AdList },

  { path: '/users/user-manage', name: 'User List', component: UserList },
  { path: '/users/order-manage', name: 'Order List', component: OrderList },
  { path: '/users/review-manage', name: 'Review List', component: ReviewList },
  { path: '/users/installment-manage', name: 'Installment List', component: InstallmentList },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/notification', name: 'Notification List', component: NotificationList },
];

export default routes;
