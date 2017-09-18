import React from 'react';
import { connect } from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionStar from 'material-ui/svg-icons/toggle/star';
import ActionStarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { setDescription } from '../store/reducers/review/description';
import { setStar } from '../store/reducers/review/star';
import { createReview } from '../store/reducers/review';

function ReviewForm({ description, star, setReviewDescription, setReviewStar, createThisReview, match }) {

  function handleRadioChange(e) {
    setReviewStar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createThisReview(description, star, match.params.productId);
  }

  const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
  };

  return
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <RadioButtonGroup name="star-review" onChange={handleRadioChange} >
    //       <RadioButtonGroup
    //         value="1"
    //         checkedIcon={<ActionStar />}
    //         uncheckedIcon={<ActionStarBorder />}
    //         style={styles.radioButton}
    //     </RadioButtonGroup>
    //     <input name="stars" type="radio" value="1" id="star-1" checked={star === '1'} onChange={handleRadioChange} />
    //     <label htmlFor="star-1">1</label>
    //     <input name="stars" type="radio" value="2" id="star-2" checked={star === '2'} onChange={handleRadioChange} />
    //     <label htmlFor="star-2">2</label>
    //     <input name="stars" type="radio" value="3" id="star-3" checked={star === '3'} onChange={handleRadioChange} />
    //     <label htmlFor="star-3">3</label>
    //     <input name="stars" type="radio" value="4" id="star-4" checked={star === '4'} onChange={handleRadioChange} />
    //     <label htmlFor="star-4">4</label>
    //     <input name="stars" type="radio" value="5" id="star-5" checked={star === '5'} onChange={handleRadioChange} />
    //     <label htmlFor="star-5">5</label>
    //     <textarea name="description" value={description} onChange={e => setReviewDescription(e.target.value)} />
    //     <input type="submit" value="Submit Review" />
    //   </form>
    // </div>
  // );
}

const mapState = (state, ownProps) => ({
  description: state.review.description,
  star: state.review.star,
});

const mapDispatch = dispatch => ({
  setReviewDescription: description => dispatch(setDescription(description)),
  setReviewStar: star => dispatch(setStar(star)),
  createThisReview: (description, star, productId) => dispatch(createReview(description, star, productId)),
});

export default connect(mapState, mapDispatch)(ReviewForm);
