import React from 'react';
import { connect } from 'react-redux';
import { ReviewList } from './';
import { H1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';
import { addProductToCart } from '../store/reducers/cart';

function Product({ product, reviews, photo, addProductToCart }) {
  const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  function handleSubmit(e) {
    e.preventDefault();
    addProductToCart(product.id, e.target.cartQuantity.value);
  }

  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem', marginTop: '5rem', minWidth: '40rem' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '50%' }}>
          <h3>{product && product.title}</h3>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexBasis: '40%', marginRight: '2rem' }}>
          <img src={photo && photo.photoURL} alt="Product" style={{ maxWidth: '100%', height: 'auto', border: '1px solid #333', padding: '10px' }} />
        </div>
        <div style={{ flexBasis: '60%' }}>
          <h4>$ {product && product.price}</h4>
          <span>
            <form onSubmit={handleSubmit}>
              <select name="cartQuantity">
                { quantityArr.map(val => <option key={`select-${val}`} value={val}>{val}</option>) }
              </select>
              <input type="submit" value="add to cart" />
            </form>
          </span>
          <p>
            {
              product && (product.isAvailable ? 'in stock' : 'out of stock')
            }
          </p>
          <p>{product && product.description}</p>
        </div>
      </div>
      <ReviewList reviews={reviews} />
    </div>
  );
}

const mapState = (state, ownProps) => {
  const product = state.products.find(thisProduct => +thisProduct.id === +ownProps.match.params.productId);
  const reviews = state.reviews.filter(review => +review.productId === +ownProps.match.params.productId);
  const photo = state.photos.find(thisPhoto => +thisPhoto.productId === +ownProps.match.params.productId);
  return {
    reviews,
    product,
    photo,
  };
};

const mapDispatch = dispatch => ({
  addProductToCart: (productId, quantity) => dispatch(addProductToCart(+productId, +quantity)),
});

export default connect(mapState, mapDispatch)(Product);
