import {combineReducers} from 'redux';

import address from './address';
import auth from './auth';
import brands from './brands';
import categories from './categories';
import cart from './cart';
import color from './color';
import currency from './currency';
import group from './group';
import notification from './notification';
import order from './order';
import products from './products';
import review from './review';
import user from './user';
import installment from './installment';
import ad from './ad';
export default combineReducers({
  ad,
  address,
  auth,
  brands,
  categories,
  cart,
  color,
  currency,
  group,
  notification,
  order,
  products,
  review,
  user,
  installment,
});
