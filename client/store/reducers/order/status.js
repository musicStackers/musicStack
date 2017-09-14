// ACTION TYPES
const SET_STATUS = 'SET_STATUS';

// ACTION CREATORS
export const setAddress = status => ({
  type: SET_STATUS,
  status,
});

// REDUCER
export default function reducer(status = '', action) {
  switch (action.type) {
    case SET_STATUS:
      return action.status;
    default:
      return status;
  }
}
