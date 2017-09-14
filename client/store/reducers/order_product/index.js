import axios from 'axios';

// ACTION TYPES
const SET_ORDER_PRODUCT = 'SET_ORDER_PRODUCT';

// ACTION CREATORS
export const setOrderProduct = orderProduct => ({
  type: SET_ORDER_PRODUCT,
  orderProduct,
});

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_ORDER_PRODUCT:
      return action.orderProduct;
    default:
      return state;
  }
}

// THUNK CREATORS
export const fetchOrderProduct = () => (dispatch) => {
  axios.get('/api/order_product')
    .then(res => res.data)
    .then(orderProduct => dispatch(setOrderProduct(orderProduct)))
    .catch(console.error);
};
