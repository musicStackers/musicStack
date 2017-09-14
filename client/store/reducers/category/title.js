// ACTION TYPES
const SET_TITLE = 'SET_TITLE';

// ACTION CREATORS
export const setTitle = title => ({
  type: SET_TITLE,
  title,
});

// REDUCER
export default function (title = '', action) {
  switch (action.type) {
    case SET_TITLE:
      return action.title;
    default:
      return title;
  }
}
