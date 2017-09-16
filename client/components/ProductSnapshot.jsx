import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H2, H3, P } from './reusableStyles';


// Component
export default function ProductSnapshot(props) {
  const { id, title, img, price, stars, review } = props;
  // console.log('stars', stars);
  // console.log('review', review)

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
    vertical-align: middle;
    width: 200px;
  `;
  const ProductPhoto = styled.div`
    width: 150px;
    height: 200px;
    background-image: url(${img});
    background-size: contain;
    background-repeat: no-repeat;
  `;
  const PaddingH2 = H2.extend`
    padding: 5px;
    text-align: left;
  `;

  // Styled Components
  return (
    <MuiThemeProvider>
      <ProductWrapper>
        <ProductInfo>
          <ProductPhoto />
        </ProductInfo>
        <ProductInfo>
          <Link to={`/products/${id}`}>
            <PaddingH2>{title}</PaddingH2>
          </Link>
          <H3>{`$ ${price}.00`}</H3>
        </ProductInfo>
        <ProductInfo>
          <P>STARS-{stars}</P>
          <H3>Product Review</H3>
          <P>{review}</P>
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
  review: PropTypes.string.isRequired,
};
