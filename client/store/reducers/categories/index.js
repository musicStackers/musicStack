import axios from 'axios';

// ACTION TYPES
const SET_CATEGORIES = 'SET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

// ACTION CREATORS
export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
});

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category,
});

// REDUCER
export default function (categories = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return categories.concat(action.category);
    default:
      return categories;
  }
}

// THUNK CREATORS
export const fetchCategories = () => (dispatch) => {
  axios.get('/api/categories')
    .then(categories => dispatch(setCategories(categories)))
    .catch(console.error);
};
