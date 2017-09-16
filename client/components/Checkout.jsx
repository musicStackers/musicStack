import React from 'react';
import { connect } from 'react-redux';

function Checkout() {
  return (
    <div>
      <div>checkout</div>
    </div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Checkout);
