import React from 'react';
import PropTypes from 'prop-types';
import FullStarIcon from 'material-ui/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/svg-icons/toggle/star-border';
import HalfStarIcon from 'material-ui/svg-icons/toggle/star-half';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Stars(props) {
  const { starRating } = props;
  let numStars = starRating;
  const starArr = [];

  for (let i = 1; i <= 5; i += 1) {
    if (numStars >= 1) starArr.push(<FullStarIcon key={i} />);
    else if (numStars > 0 && numStars < 1) starArr.push(<HalfStarIcon key={i} />);
    else starArr.push(<EmptyStarIcon key={i} />);
    numStars -= 1;
  }

  return (
    <MuiThemeProvider>
      <div>
        {starArr}
      </div>
    </MuiThemeProvider>
  );
}

Stars.propTypes = {
  starRating: PropTypes.number.isRequired,
};
