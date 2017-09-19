import axios from 'axios';
import { addCategoryProduct } from '../category_product';
import { addPhoto } from '../photos';

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

// ACTION CREATORS
export const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});

// REDUCER
export default function (products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return products.concat(action.product);
    default:
      return products;
  }
}

// THUNK CREATORS
export const fetchProducts = () => (dispatch) => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(setProducts(products)))
    .catch(console.error);
};

export const addProductThunk = ((product, history) => (
  ((dispatch) => {
    axios.post('/api/products', product)
      .then(res => res.data)
      .then(({ newProduct, newPhoto }) => {
        newPhoto.productId = newProduct.id;
        dispatch(addProduct(newProduct));
        dispatch(addPhoto(newPhoto));
        dispatch(addCategoryProduct({
          productId: newProduct.id,
          categoryId: product.category,
        }));
        history.push(`/product/${newProduct.id}`);
      })
      .catch(console.error);
  })
));
