import axios from 'axios';

// ACTION TYPES
const SET_PHOTOS = 'SET_PHOTOS';
const ADD_PHOTO = 'ADD_PHOTO';

// ACTION CREATORS
export const setPhotos = photos => ({
  type: SET_PHOTOS,
  photos,
});

export const addPhoto = photo => ({
  type: ADD_PHOTO,
  photo,
});

// REDUCER
export default function reducer(photos = [], action) {
  switch (action.type) {
    case SET_PHOTOS:
      return action.photos;
    case ADD_PHOTO:
      return photos.concat(action.photo);
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
