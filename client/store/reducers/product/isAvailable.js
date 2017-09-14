// ACTION TYPES
const SET_ISAVAILABLE = 'SET_ISAVAILABLE';

// ACTION CREATORS
export const setDescription = isAvailable => ({
  type: SET_ISAVAILABLE,
  isAvailable,
});

// REDUCER
export default function reducer(isAvailable = true, action) {
  switch (action.type) {
    case SET_ISAVAILABLE:
      return action.isAvailable;
    default:
      return isAvailable;
  }
}
