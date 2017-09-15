import React from 'react';
import { connect } from 'react-redux';
import { Review } from './';

function ReviewList ({ reviews, users }) {

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', marginBottom: '2rem' }}><span>Reviews</span><span>Write A Review</span></div>
      {
        reviews.map(review => {
          const user = users.find(user => +user.id === +review.userId);
          return <Review key={review.id} review={review} user={user}/>;
        })
      }
    </div>
  );
}

const mapState = (state, ownProps) => ({
  users: state.users,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ReviewList);
