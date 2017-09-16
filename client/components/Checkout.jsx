import React from 'react';
import { connect } from 'react-redux';
import { CartList } from './index';
import { setEmail } from '../store/reducers/checkout/email';
import { setAddress } from '../store/reducers/checkout/address';
import { createOrder } from '../store/reducers/checkout';

function Checkout({ email, address, setEmail, setAddress, cart, createOrder }) {

  function handleSubmit(e) {
    e.preventDefault();
    createOrder(e.target.email.value, e.target.address.value, cart);
  }

  return (
    <div>
      <div>checkout</div>
      <CartList />
      <form onSubmit={handleSubmit} >
        <label htmlFor="email">Email:</label>
        <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="address">Address:</label>
        <input name="address" type="text" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="submit" value="Confirm Purchase" />
      </form>
    </div>
  );
}

const mapState = (state, ownProps) => ({
  email: state.checkout.email,
  address: state.checkout.address,
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  setEmail: email => dispatch(setEmail(email)),
  setAddress: address => dispatch(setAddress(address)),
  createOrder: (email, address, cart) => dispatch(createOrder(email, address, cart)),
});

export default connect(mapState, mapDispatch)(Checkout);
