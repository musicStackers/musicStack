import axios from 'axios';

// ACTION TYPES
const SET_CART = 'SET_CART';
const ADD_OR_UPDATE_CART_ENTRY = 'ADD_OR_UPDATE_CART_ENTRY';

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart,
});

export const addOrUpdateCartEntry = entry => ({
  type: ADD_OR_UPDATE_CART_ENTRY,
  entry,
});

// REDUCER
export default function (cart = [], action) {
  let existingEntryIndex;
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_OR_UPDATE_CART_ENTRY:
      existingEntryIndex = cart.findIndex(entry => entry.productId === action.entry.productId);
      if (existingEntryIndex !== -1) {
        return [...cart.slice(0, existingEntryIndex), action.entry, ...cart.slice(existingEntryIndex + 1)];
      }
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
  axios.post('/cart', { productId, quantity })
    .then(res => res.data)
    .then(entry => dispatch(addOrUpdateCartEntry(entry)))
    .catch(console.error);
};

export const updateCartEntry = (productId, quantity) => (dispatch) => {
  axios.put('/cart', { productId, quantity })
    .then(res => res.data)
    .then(entry => dispatch(addOrUpdateCartEntry(entry)))
    .catch(console.error);
};
