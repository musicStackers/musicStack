import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CartList } from './index';

function Cart() {
  return (
    <div>
      <CartList />
      <div><NavLink to="/cart/checkout">Check Out</NavLink></div>
    </div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Cart);
