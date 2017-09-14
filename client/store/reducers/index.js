import { combineReducers } from 'redux';
import user from './user';
import categoryProduct from './category_product';
import orderProduct from './order_product';
import orders from './orders';
import order from './order';

export default combineReducers({ user, categoryProduct, orderProduct, orders, order });
