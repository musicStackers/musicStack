import { combineReducers } from 'redux';
import axios from 'axios';
import store from '../../';
import { addProduct } from '../products';
import title from './title';
import description from './description';
import price from './price';
import isAvailable from './isAvailable';

// REDUCER
export default combineReducers({ title, description, price, isAvailable });

// THUNK CREATORS
export const createProduct = userId => (dispatch) => {
  const product = store.getState().product;
  axios.post(`/api/products/${userId}`, { title: product.title, description: product.description, price: product.price, isAvailable: product.isAvailable })
    /*
      This may need to be rewritten (along with the corresponding API route) to deal with the
      order_product join table information
    */
    .then(res => res.data)
    .then(newProduct => dispatch(addProduct(newProduct)))
    .catch(console.error);
};
