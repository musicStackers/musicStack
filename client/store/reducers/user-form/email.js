// ACTION TYPES
const UPDATE_EMAIL = 'EDIT_EMAIL';

// ACTION CREATORS
export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  email,
});

// REDUCER
export default function (email = '', action) {
  switch (action.type) {
    case UPDATE_EMAIL:
      return action.email;
    default:
      return email;
  }
}