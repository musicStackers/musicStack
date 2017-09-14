import axios from 'axios';

// ACTION TYPES
const SET_CART = 'SET_CART';
const ADD_ENTRY_TO_CART = 'ADD_ENTRY_TO_CART';

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart,
});

export const addEntryToCart = entry => ({
  type: ADD_ENTRY_TO_CART,
  entry,
});

// REDUCER
export default function (cart = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_ENTRY_TO_CART:
      return cart.concat(action.entry);
    default:
      return cart;
  }
}

// THUNK CREATORS
export const fetchCart = () => (dispatch) => {
  axios.get('/cart')
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error);
};

export const addProductToCart = (productId, quantity) => (dispatch) => {
  axios.post('/cart')
};
