import axios from 'axios';

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

// ACTION CREATORS
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});

// REDUCER
export default function (products = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return products.concat(action.product);
    default:
      return products;
  }
}

// THUNK CREATORS
export const fetchProducts = () => (dispatch) => {
  axios.get('api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(console.error);
};
