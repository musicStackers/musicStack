import axios from 'axios';

// ACTION TYPES
const SET_CATEGORY_PRODUCT = 'SET_CATEGORY_PRODUCT';

// ACTION CREATORS
export const setCategoryProduct = categoryProduct => ({
  type: SET_CATEGORY_PRODUCT,
  categoryProduct,
});

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_CATEGORY_PRODUCT:
      return action.categoryProduct;
    default:
      return state;
  }
}

// THUNK CREATORS
export const fetchCategoryProduct = () => (dispatch) => {
  axios.get('/api/category_product')
    .then(categoryProduct => dispatch(setCategoryProduct(categoryProduct)))
    .catch(console.error);
};
