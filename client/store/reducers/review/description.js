// ACTION TYPES
const SET_DESCRIPTION = 'SET_DESCRIPTION';

// ACTION CREATORS
export const setDescription = description => ({
  type: SET_DESCRIPTION,
  description,
});

// REDUCER
export default function (description = '', action) {
  switch (action.type) {
    case SET_DESCRIPTION:
      return action.description;
    default:
      return description;
  }
}
