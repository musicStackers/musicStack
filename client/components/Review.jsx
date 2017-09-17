import React from 'react';
import { connect } from 'react-redux';
import Stars from './Stars.jsx';
import { Box } from './reusableStyles.js';

function Review({ review, user }) {
  const style = {
    review: {
      padding: '10px',
    },
    email: {
      paddingRight: '20px',
    },
  };

  return (
    <div style={style.review}>
      <Box>
        <div style={style.email}>{user && user.email}</div>
        <Stars starRating={review.star} />
      </Box>
      <div>{review.description}</div>
    </div>
  );
}

const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Review);
