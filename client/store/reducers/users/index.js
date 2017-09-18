import axios from 'axios';

// ACTION TYPES
const SET_USERS = 'SET_USERS';
const REMOVE_USER_BY_ID = 'REMOVE_USER_BY_ID';
const REPLACE_USER = 'REPLACE_USER';

// ACTION CREATORS
export const setUsers = users => ({
  type: SET_USERS,
  users,
});

export const removeUserById = userId => ({
  type: REMOVE_USER_BY_ID,
  userId,
});

export const replaceUser = user => ({
  type: REPLACE_USER,
  user,
});

// REDUCER
export default function reducer(users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case REMOVE_USER_BY_ID:
      return users.filter(user => +user.id !== +action.userId);
    case REPLACE_USER:
      return users.filter(user => +user.id !== +action.user.id).concat(action.user);
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

export const deleteUser = userId => (dispatch) => {
  axios.delete(`/api/users/${userId}`)
    .then(res => res.status)
    .then((status) => {
      if (status === 204) {
        return dispatch(removeUserById(userId));
      }
    })
    .catch(console.error);
};

export const makeUserAdmin = (userId, isAdmin) => (dispatch) => {
  if (isAdmin) return;
  axios.put(`/api/users/${userId}/toAdmin`)
    .then(res => res.data)
    .then(user => dispatch(replaceUser(user)))
    .catch(console.error);
};
