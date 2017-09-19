import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Router, Route, NavLink } from 'react-router-dom';
import { Review, ReviewForm } from './';
import { H2, InnerBox } from './reusableStyles';
import history from '../history';

function ReviewList({ reviews, user, users, productId }) {
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4rem',
    marginBottom: '2rem',
  };

  const reviewButton = (
    <FlatButton
      label="Write a Review"
      onClick={() => history.push(`/product/${productId}/review-form`)}
    />
  );
  console.log('user', user, 'users', users)
  return (
    <MuiThemeProvider>
      <div>
        <div style={style}>
          <H2>Reviews</H2>
          { user.id ? reviewButton : null }
        </div>
        <div>
          <Router history={history}>
            <Route exact path="/product/:productId/review-form" component={ReviewForm} />
          </Router>
        </div>
        {
          reviews.map((review) => {
            const reviewUser = users.find(foundUser => +foundUser.id === +review.userId);
            return (
              <Review
                key={review.id}
                review={review}
                user={reviewUser}
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
  user: state.user,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ReviewList);
