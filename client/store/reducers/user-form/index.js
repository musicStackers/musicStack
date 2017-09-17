import { combineReducers } from 'redux';
import axios from 'axios';
import address from './address';
import email from './email';
import password from './password';
import history from '../../../history';
import { getUser } from '../user';

export default combineReducers({ address, email, password });

// THUNK CREATORS
export const editUser = (userAddress, userEmail, userId, userPassword) => (dispatch) => {
  axios.put(`/api/users/${userId}`, {
    email: userEmail,
    address: userAddress,
    password: userPassword,
  })
    .then(res => res.data)
    .then(user => dispatch(getUser(user)))
    .catch(console.error);
}