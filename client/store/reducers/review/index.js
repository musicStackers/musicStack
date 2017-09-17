import { combineReducers } from 'redux';
import axios from 'axios';
import description from './description';
import star from './star';
import { addReview } from '../reviews';
import history from '../../../history';

export default combineReducers({ description, star });

// THUNK CREATORS
export const createReview = (reviewDescription, reviewStar, productId) => (dispatch) => {
  axios.post('/api/reviews', { description: reviewDescription, star: reviewStar, productId })
    .then(res => res.data)
    .then(review => dispatch(addReview(review)))
    .then(() => history.push(`/product/${productId}`))
    .catch(console.error);
};
