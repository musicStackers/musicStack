import { combineReducers } from 'redux';
import axios from 'axios';
import email from './email';
import address from './address';
import { addOrder } from '../orders';
import { addOrderProducts } from '../order_product';
import { clearCart } from '../cart';
import history from '../../../history';

export default combineReducers({ email, address });

// THUNK CREATORS
export const createOrder = (orderEmail, orderAddress, cart) => (dispatch) => {
  axios.post('/api/orders', { email: orderEmail, address: orderAddress, cart })
    .then(res => res.data)
    .then((purchaseInfo) => {
      console.log('purchaseInfo is', purchaseInfo);
      console.log('orderProducts are', purchaseInfo.orderproducts);
      console.log('newOrder is', purchaseInfo.newOrder);
      dispatch(addOrder(purchaseInfo.newOrder));
      dispatch(addOrderProducts(purchaseInfo.orderproducts));
      dispatch(clearCart());
    })
    .then(() => alert('Your order was placed successfully!'))
    .then(() => history.push(''))
    .catch(err => alert('Your order was not placed. Please make sure you have entered a valid email and address.'));
};
