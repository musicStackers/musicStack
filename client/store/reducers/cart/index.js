import axios from 'axios';

// ACTION TYPES
const SET_CART = 'SET_CART';
const ADD_OR_UPDATE_CART_ENTRY = 'ADD_OR_UPDATE_CART_ENTRY';
const REMOVE_CART_ENTRY_BY_PRODUCT_ID = 'REMOVE_CART_ENTRY_BY_PRODUCT_ID';

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart,
});

export const addOrUpdateCartEntry = entry => ({
  type: ADD_OR_UPDATE_CART_ENTRY,
  entry,
});

export const removeCartEntryByProductId = productId => ({
  type: REMOVE_CART_ENTRY_BY_PRODUCT_ID,
  productId,
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
    case REMOVE_CART_ENTRY_BY_PRODUCT_ID:
      existingEntryIndex = cart.findIndex(entry => entry.productId === action.productId);
      if (existingEntryIndex !== -1) {
        return [...cart.slice(0, existingEntryIndex), ...cart.slice(existingEntryIndex + 1)];
      }
      return cart;
    default:
      return cart;
  }
}

// THUNK CREATORS
export const fetchCart = () => (dispatch) => {
  axios.get('api/cart')
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error);
};

export const addProductToCart = (productId, quantity) => (dispatch) => {
  axios.post('api/cart', { productId, quantity })
    .then(res => res.data)
    .then(entry => dispatch(addOrUpdateCartEntry(entry)))
    .catch(console.error);
};

export const updateCartEntry = (productId, quantity) => (dispatch) => {
  axios.put('api/cart', { productId, quantity })
    .then(res => res.data)
    .then(entry => dispatch(addOrUpdateCartEntry(entry)))
    .catch(console.error);
};

export const deleteCartEntry = productId => (dispatch) => {
  axios.delete('api/cart', { productId })
    .then((res) => {
      if (res.status === 200) {
        dispatch(removeCartEntryByProductId(productId));
      }
    })
    .catch(console.error);
};
