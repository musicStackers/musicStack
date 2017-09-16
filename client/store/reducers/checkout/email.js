// ACTION TYPES
const SET_EMAIL = 'SET_EMAIL';

// ACTION CREATORS
export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

// REDUCER
export default function (email = '', action) {
  switch (action.type) {
    case SET_EMAIL:
      return action.email;
    default:
      return email;
  }
}
