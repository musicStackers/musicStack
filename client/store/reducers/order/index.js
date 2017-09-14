import { combineReducers } from 'redux';
import axios from 'axios';
import store from '../../';
import { addOrder } from '../orders';
import address from './address';
import status from './status';
import email from './email';

// REDUCER
export default combineReducers({ address, status, email });

// THUNK CREATORS
export const createOrder = userId => (dispatch) => {
  const order = store.getState().order;
  axios.post(`api/orders/${userId}`, { address: order.address, status: order.status, email: order.email })
    /*
      This may need to be rewritten (along with the corresponding API route) to deal with the
      order_product join table information
    */
    .then(res => res.data)
    .then(newOrder => dispatch(addOrder(newOrder)))
    .catch(console.error);
};
