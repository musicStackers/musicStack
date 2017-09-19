import { combineReducers } from 'redux';
import axios from 'axios';
import store from '../../';
import { addOrder } from '../orders';
import address from './address';
import status from './status';
import email from './email';

// REDUCER
export default combineReducers({ address, status, email });
