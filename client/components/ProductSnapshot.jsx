import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H2, H3 } from './reusableStyles';


// Component
export default function ProductSnapshot(props) {
  const { id, title, img, price, stars, review } = props;


  const ProductWrapper = styled.div`
    margin: 50px;
    height:100%;
    display: flex;
    border-bottom: 2px solid #69b6ff;
  `;
  const ProductInfo = styled.div`
    flex-wrap: wrap;
    margin: 10px;
    text-align: left;
    width: 200px;
  `;

  // Styled Components
  return (
    <MuiThemeProvider>
      <ProductWrapper>
        <ProductInfo>
          <img src={img} alt="product" width="200" height="300" />
        </ProductInfo>
        <ProductInfo>
          <Link to={`/products/${id}`}>
            <H2>{title}</H2>
          </Link>
          <H3>{`$ ${price}`}</H3>
        </ProductInfo>
        <ProductInfo>
          <div>STARS-{review.star}</div>
          <H3>Product Review</H3>
          <p>{review}</p>
        </ProductInfo>
      </ProductWrapper>
    </MuiThemeProvider>
  );
}

ProductSnapshot.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  reviews: PropTypes.string.isRequired,
};
