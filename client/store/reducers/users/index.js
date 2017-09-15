import axios from 'axios';

// ACTION TYPES
const SET_USERS = 'SET_USERS';

// ACTION CREATORS
export const setUsers = users => ({
  type: SET_USERS,
  users,
});

// REDUCER
export default function reducer(users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return users;
  }
}

// THUNK CREATORS
export const fetchUsers = () => (dispatch) => {
  axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch(setUsers(users)))
    .catch(console.error);
};
