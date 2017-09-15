import React from 'react';
import { connect } from 'react-redux';
import { Review } from './';

class ReviewList extends React.Component {
  render() {
    const { reviews } = this.props;
    console.log('reviews are', reviews);
    return (
      <div>foo
        {
          reviews.map(review => <Review key={review.id} review={review} />)
        }
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  reviews: state.reviews,
  users: state.users,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(ReviewList);
