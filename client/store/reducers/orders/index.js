import axios from 'axios';

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';

// ACTION CREATORS
export const setOrders = orders => ({
  type: SET_ORDERS,
  orders,
});

export const addOrder = order => ({
  type: ADD_ORDER,
  order,
});

// REDUCER
export default function reducer(orders = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return orders.concat(action.order);
    default:
      return orders;
  }
}

// THUNK CREATORS
export const fetchOrders = () => (dispatch) => {
  axios.get('/api/orders')
    .then(orders => dispatch(setOrders(orders)))
    .catch(console.error);
};

export const fetchOrdersByUserId = userId => (dispatch) => {
  axios.get(`/api/orders/${userId}`)
    .then(orders => dispatch(setOrders(orders)))
    .catch(console.error);
};
