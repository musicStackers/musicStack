import axios from 'axios';

// ACTION TYPES
const SET_PHOTOS = 'SET_PHOTOS';

// ACTION CREATORS
export const setPhotos = photos => ({
  type: SET_PHOTOS,
  photos,
});

// REDUCER
export default function reducer(photos = [], action) {
  switch (action.type) {
    case SET_PHOTOS:
      return action.photos;
    default:
      return photos;
  }
}

// THUNK CREATORS
export const fetchPhotos = () => (dispatch) => {
  axios.get('/api/photos')
    .then(res => res.data)
    .then(photos => dispatch(setPhotos(photos)))
    .catch(console.error);
};
