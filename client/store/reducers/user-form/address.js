// ACTION TYPES
const UPDATE_ADDRESS = 'EDIT_ADDRESS';

// ACTION CREATORS
export const updateAddress = address => ({
  type: UPDATE_ADDRESS,
  address,
});

// REDUCER
export default function (address = '', action) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return action.address;
    default:
      return address;
  }
}
