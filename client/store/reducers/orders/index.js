import axios from 'axios';

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const REPLACE_ORDER = 'REPLACE_ORDER';

// ACTION CREATORS
export const setOrders = orders => ({
  type: SET_ORDERS,
  orders,
});

export const addOrder = order => ({
  type: ADD_ORDER,
  order,
});

export const replaceOrder = order => ({
  type: REPLACE_ORDER,
  order,
})

// REDUCER
export default function reducer(orders = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return orders.concat(action.order);
    case REPLACE_ORDER:
      return orders.filter(order => +order.id !== +action.order.id).concat(action.order);
    default:
      return orders;
  }
}

// THUNK CREATORS
export const fetchOrders = () => (dispatch) => {
  axios.get('/api/orders')
    .then(res => res.data)
    .then(orders => dispatch(setOrders(orders)))
    .catch(console.error);
};

export const fetchOrdersByUserId = userId => (dispatch) => {
  axios.get(`/api/orders/${userId}`)
    .then(res => res.data)
    .then(orders => dispatch(setOrders(orders)))
    .catch(console.error);
};

export const updateOrderStatus = (orderId, status) => (dispatch) => {
  console.log('status is', status);
  axios.put(`/api/orders/${orderId}`, { status })
    .then(res => res.data)
    .then(order => dispatch(replaceOrder(order)))
    .catch(console.error);
};
