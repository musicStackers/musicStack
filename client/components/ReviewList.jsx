import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Review } from './';
import { H2, InnerBox } from './reusableStyles';

function ReviewList({ reviews, users }) {
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4rem',
    marginBottom: '2rem',
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <MuiThemeProvider>
      <div>
        <div style={style}>
          <H2>Reviews</H2>
          <FlatButton
            label="Write a Review"
            onClick={handleSubmit}
          />
        </div>
        {
          reviews.map((review) => {
            const user = users.find(user => +user.id === +review.userId);
            return (
              <Review
                key={review.id}
                review={review}
                user={user}
              />
            );
          })
        }
      </div>
    </MuiThemeProvider>
  );
}

const mapState = (state) => ({
  users: state.users,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ReviewList);
