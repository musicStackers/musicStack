// ACTION TYPES
const SET_ADDRESS = 'SET_ADDRESS';

// ACTION CREATORS
export const setAddress = address => ({
  type: SET_ADDRESS,
  address,
});

// REDUCER
export default function reducer(address = '', action) {
  switch (action) {
    case SET_ADDRESS:
      return action.address;
    default:
      return address;
  }
}
