import React from 'react';
import { connect } from 'react-redux';

function Review(props) {
  return (
    <div>{props.review.description}</div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Review);
