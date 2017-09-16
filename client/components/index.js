/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main.jsx';
export { default as Nav } from './Nav.jsx';
export { default as Landing } from './Landing.jsx';
export { default as Cart } from './Cart.jsx';
export { default as CartList } from './CartList.jsx';
export { default as CartEntry } from './CartEntry.jsx';
export { default as Checkout } from './Checkout.jsx';
export { default as Dashboard } from './Dashboard.jsx';
export { default as AllProducts } from './AllProducts.jsx';
export { default as Product } from './Product.jsx';
export { default as UserHome } from './user-home.jsx';
export { default as ReviewList } from './ReviewList.jsx';
export { default as Review } from './Review.jsx';
export { Login, Signup } from './Auth-form.jsx';

