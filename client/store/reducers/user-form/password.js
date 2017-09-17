// ACTION TYPES
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

// ACTION CREATORS
export const updatePassword = password => ({
  type: UPDATE_PASSWORD,
  password,
});

// REDUCER
export default function (password = '', action) {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return action.password;
    default:
      return password;
  }
}