import { combineReducers } from 'redux';
import axios from 'axios';
import address from './address';
import email from './email';
import history from '../../../history';

export default combineReducers({ address, email });

// THUNK CREATORS
export const editUser = (userAddress, userEmail) => (dispatch) => {
  axios.
}