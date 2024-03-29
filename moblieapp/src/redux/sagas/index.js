import {all} from 'redux-saga/effects';

import address from './address';
import auth from './auth';
import brands from './brands';
import categories from './categories';
import color from './color';
import group from './group';
import notification from './notification';
import order from './order';
import products from './products';
import review from './review';
import user from './user';
import installment from './installment';
import ad from './ad';
export default function* rootSaga(getState) {
  yield all([
    ad(),
    address(),
    auth(),
    brands(),
    categories(),
    color(),
    group(),
    notification(),
    order(),
    products(),
    review(),
    user(),
    installment(),
  ]);
}
