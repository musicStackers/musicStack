import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import { H1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';
import ProductSnapshot from './ProductSnapshot.jsx';

// Component
function AllProducts(props) {

  const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
    input: {
      width: 20,
    },
  };

  const ProductsTitlePhoto = PhotoDivider.extend`
    background-image: url('http://via.placeholder.com/350x150');
  `;

  const ProductsWrapper = styled.div`
    height:100%;
    float: left;
    border-left: 2px solid #69b6ff;
  `;

  const filterReviews = (productId) => {
    const reviews = props.reviews;

    reviews.filter((review) => {
      return review.productId === productId;
    });

    return reviews;
  };

  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        <ProductsTitlePhoto>
          <H1>Products</H1>
        </ProductsTitlePhoto>
        <SideBar>
          <H2>Filter Products</H2>
          <div>
            <H3>Categories</H3>
            {
              props.categories.map((category) => {
                return (
                  <Checkbox
                    label={category.title}
                    style={styles.checkbox}
                    key={category.id}
                  />
                );
              })
            }
          </div>
          <div>
            <H3>Price</H3>
            <div>
              <H3>Min</H3>
              <TextField
                name="minprice"
                style={styles.input}
              />
            </div>
            <div>
              <H3>Min</H3>
              <TextField
                name="maxprice"
                style={styles.input}
              />
            </div>
          </div>
          <div>
            <H3>Stars</H3>
          </div>
        </SideBar>
        <ProductsWrapper>
          {
            props.products.map((product) => {
              return (
                <ProductSnapshot
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  img={product.img}
                  price={product.price}
                  reviews={filterReviews(product.id)}
                />
              );
            })
          }
        </ProductsWrapper>
      </div>
    </MuiThemeProvider>
  );
}

// Container
const mapState = (state, ownProps) => ({
  categories: state.categories,
  products: state.products,
  reviews: state.reviews,
  photos: state.photos,
});

// const mapDispatch = (dispatch) => {
//   return {
//   };
// };
// const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllProducts);

// AllProducts.propTypes = {
//   categories: PropTypes.array.isRequired,
//   products: PropTypes.array.isRequired,
// };
