import React from 'react';
import { connect } from 'react-redux';

function Review(props) {
  return (
    <div>
      <div>
        <div>{props.user && props.user.email}</div>
        <div>{props.review.description}</div>
      </div>
    </div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Review);
