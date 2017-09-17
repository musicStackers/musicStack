import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H2, H3, P } from './reusableStyles';
import Stars from './Stars.jsx';


// Component
export default function ProductSnapshot(props) {
  const { id, title, img, price, stars, description } = props;

  const ProductWrapper = styled.div`
    margin-left: 20px;
    padding: 20px;
    height:100%;
    display: flex;
    border-bottom: 1px solid #bdbdbd;
    align-items: flex-start;
    align-content: center;

  `;
  const ProductInfo = styled.div`
    flex-wrap: wrap;
    padding: 20px;
    text-align: left;
    width: 350px;
  `;
  const ProductPhoto = ProductInfo.extend`
    height: 200px;
    background-image: url(${img});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 10px auto;
  `;
  const PaddingH2 = H2.extend`
    padding: 5px;
    text-align: left;
  `;
  const truncatedDesc = desc => `${desc.slice(0, 75)}...`;

  // Styled Components
  return (
    <MuiThemeProvider>
      <ProductWrapper>
        <ProductPhoto />
        <ProductInfo>
          <Link to={`/product/${id}`}>
            <PaddingH2>{title}</PaddingH2>
          </Link>
          <H3>{`$ ${price}.00`}</H3>
        </ProductInfo>
        <ProductInfo>
          <Stars
            starRating={stars}
          />
          <H3>Product Description</H3>
          <P>{truncatedDesc(description)}</P>
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
  description: PropTypes.string.isRequired,
};
