// ACTION TYPES
const SET_STAR = 'SET_STAR';

// ACTION CREATORS
export const setStar = star => ({
  type: SET_STAR,
  star,
});

// REDUCER
export default function (star = 0, action) {
  switch (action.type) {
    case SET_STAR:
      return action.star;
    default:
      return star;
  }
}
