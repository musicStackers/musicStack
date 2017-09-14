import { combineReducers } from 'redux';
import axios from 'axios';
import title from './title';
import store from '../../';
import { addCategory } from '../categories';

export default combineReducers({ title });

export const createCategory = () => (dispatch) => {
  const category = store.getState().category;
  axios.post('/categories', { title: category.title })
    .then(res => res.data)
    .then(newProduct => dispatch(addCategory(newProduct)))
    .catch(console.error);
};
