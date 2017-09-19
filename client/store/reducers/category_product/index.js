import axios from 'axios';

// ACTION TYPES
const SET_CATEGORY_PRODUCT = 'SET_CATEGORY_PRODUCT';
const ADD_CATEGORY_PRODUCT = 'ADD_CATEGORY_PRODUCT';

// ACTION CREATORS
export const setCategoryProduct = categoryProduct => ({
  type: SET_CATEGORY_PRODUCT,
  categoryProduct,
});

export const addCategoryProduct = categoryProduct => ({
  type: ADD_CATEGORY_PRODUCT,
  categoryProduct,
});

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_CATEGORY_PRODUCT:
      return action.categoryProduct;
    case ADD_CATEGORY_PRODUCT:
      return state.concat(action.categoryProduct);
    default:
      return state;
  }
}

// THUNK CREATORS
export const fetchCategoryProduct = () => (dispatch) => {
  axios.get('/api/category_product')
    .then(res => res.data)
    .then(categoryProduct => dispatch(setCategoryProduct(categoryProduct)))
    .catch(console.error);
};
