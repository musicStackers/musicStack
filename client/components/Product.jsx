import React from 'react';
import { connect } from 'react-redux';
import { ReviewList } from './';

class Product extends React.Component {
  render() {
    return (
      <div><ReviewList /></div>
    );
  }
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Product);
