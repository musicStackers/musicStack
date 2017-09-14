import axios from 'axios';

// ACTION TYPES
const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

// ACTION CREATORS
export const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews,
});

export const addReview = review => ({
  type: ADD_REVIEW,
  review,
});

// REDUCER
export default function reducer(reviews = [], action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return reviews.concat(action.review);
    default:
      return reviews;
  }
}

// THUNK CREATORS
export const fetchReviews = () => (dispatch) => {
  axios.get('/api/reviews')
    .then(res => res.data)
    .then(reviews => dispatch(setReviews(reviews)))
    .catch(console.error);
};
