import axios from 'axios';

// ACTION TYPES
const SET_ORDER_PRODUCT = 'SET_ORDER_PRODUCT';
const ADD_ORDER_PRODUCTS = 'ADD_ORDER_PRODUCTS';

// ACTION CREATORS
export const setOrderProduct = orderProduct => ({
  type: SET_ORDER_PRODUCT,
  orderProduct,
});

export const addOrderProducts = orderProducts => ({
  type: ADD_ORDER_PRODUCTS,
  orderProducts,
});

// REDUCER
export default function reducer(orderProducts = [], action) {
  switch (action.type) {
    case SET_ORDER_PRODUCT:
      return action.orderProduct;
    case ADD_ORDER_PRODUCTS:
      return orderProducts.concat(action.orderProducts);
    default:
      return orderProducts;
  }
}

// THUNK CREATORS
export const fetchOrderProduct = () => (dispatch) => {
  axios.get('/api/order_product')
    .then(res => res.data)
    .then(orderProduct => dispatch(setOrderProduct(orderProduct)))
    .catch(console.error);
};
