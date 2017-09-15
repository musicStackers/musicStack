// ACTION TYPES
const SET_PRICE = 'SET_PRICE';

// ACTION CREATORS
export const setPrice = price => ({
  type: SET_PRICE,
  price,
});

// REDUCER
export default function reducer(price = '', action) {
  switch (action.type) {
    case SET_PRICE:
      return action.price;
    default:
      return price;
  }
}
