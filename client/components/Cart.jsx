import React from 'react';
import { connect } from 'react-redux';

function Cart({ products }) {
  console.log('products are', products);
  return (
    <div>
    </div>
  );
}

const mapState = (state, ownProps) => {
  const cart = state.cart;
  const products = cart.map(entry => products.find(product => +product.id === +entry.productId));
  return {
    products,
  };
};

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Cart);
