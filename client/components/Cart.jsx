import React from 'react';
import { connect } from 'react-redux';
import { CartEntry } from './index';
import { NavLink } from 'react-router-dom';

function Cart({ entries }) {
  console.log('products are', entries);
  return (
    <div>
      {
        entries.map(entry => <CartEntry key={`product-${entry.product.id}`} {...entry} />)
      }
      <div><NavLink to="/cart/checkout">Check Out</NavLink></div>
    </div>
  );
}

const mapState = (state, ownProps) => {
  const cart = state.cart;
  const entries = cart.map(entry => ({ product: state.products.find(product => +product.id === +entry.productId), quantity: entry.quantity }));
  return {
    entries,
  };
};

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Cart);
