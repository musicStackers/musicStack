import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextField, FlatButton, Checkbox } from 'material-ui';
import ActionStar from 'material-ui/svg-icons/toggle/star';
import ActionStarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { setDescription } from '../store/reducers/review/description';
import { setStar } from '../store/reducers/review/star';
import { createReview } from '../store/reducers/review';

class ReviewForm extends Component{
  constructor (props) {
    super(props);
    this.state = {
      description: '',
      star: 0,
    };
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStarChange(e) {
    e.persist();
    this.setState(state => ({
      star: e.target.value,
    }));
  }

  handleDescriptionChange(e) {
    e.persist();
    this.setState(state => ({
      description: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createThisReview(this.state.description, this.state.star, this.props.productId);
  }

  displayStars(star) {
    let starCopy = star;
    const starArr = [];

    for (let i = 1; i <= 5; i += 1) {
      if (starCopy >= 1) starArr.push(1);
      else starArr.push(0);
      starCopy -= 1;
    }
    return starArr;
  }

  render () {
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
      flex: {
        display: 'flex',
      },
    };

    const InlineCheckbox = styled(Checkbox)`
      width: 10px !important;
    `;

    const reviewStars = this.displayStars(this.state.star);

    return (
      <div style={styles.flex}>
        {
          reviewStars.map((reviewStar, i) => {
            return (
              <InlineCheckbox
                value={i + 1}
                key={i}
                onCheck={this.handleStarChange}
                checked={reviewStars[i] ? true : false}
                checkedIcon={<ActionStar />}
                uncheckedIcon={<ActionStarBorder />}
                style={styles.checkbox}
              />
            );
          })
        }
        <TextField
          id="description"
          value={this.description}
          onChange={this.handleDescriptionChange}
        />
        <FlatButton
          label="Submit Review"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  productId: ownProps.match.params.productId,
});

const mapDispatch = dispatch => ({
  createThisReview: (description, star, productId) => dispatch(createReview(description, star, productId)),
});

export default connect(mapState, mapDispatch)(ReviewForm);

// onChange={e => setReviewDescription(e.target.value)}
