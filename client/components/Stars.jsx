import React from 'react';
import PropTypes from 'prop-types';
import FullStarIcon from 'material-ui/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/svg-icons/toggle/star-border';
import HalfStarIcon from 'material-ui/svg-icons/toggle/star-half';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Stars(props) {
  let { starRating } = props;
  const starArr = [];

  for (let i = 1; i <= 5; i += 1) {
    if (starRating >= 1) starArr.push(1);
    else if (starRating > 0 && starRating < 1) starArr.push(0.5);
    else starArr.push(0);
    starRating -= 1;
  }

  return (
    <MuiThemeProvider>
      <div>
        {
          starArr.map((star, i) => {
            if (star === 1) return <FullStarIcon key={i}/>;
            else if (star === 0.5) return <HalfStarIcon key={i}/>;
            else if (star === 0) return <EmptyStarIcon key={i}/>;
          })
        }
      </div>
    </MuiThemeProvider>
  );
}

Stars.propTypes = {
  starRating: PropTypes.number.isRequired,
};
