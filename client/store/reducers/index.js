import { combineReducers } from 'redux';
import cart from './cart';
import categories from './categories';
import category from './category';
import categoryProduct from './category_product';
import order from './order';
import orderProduct from './order_product';
import orders from './orders';
import product from './product';
import products from './products';
import reviews from './reviews';
import review from './review';
import user from './user';
import users from './users';
import photos from './photos';


export default combineReducers({
  cart,
  categories,
  category,
  categoryProduct,
  order,
  orderProduct,
  orders,
  product,
  products,
  reviews,
  review,
  user,
  users,
  photos,
});
