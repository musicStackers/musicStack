import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import { H1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';
import ProductSnapshot from './ProductSnapshot.jsx';

// Component
class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      selectedMinPrice: 0,
      selectedMaxPrice: 0,
      selectedStarMin: 0,
    };
  }

  handleCheck(category) {
    this.setState(state => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter(cat => cat !== category)
        : [...state.selectedCategories, category],
    }));
  }

  filterReviews(productId) {
    const reviews = this.props.reviews;
    const filteredReviews = reviews.filter(review =>
      review.productId === productId,
    );
    return filteredReviews;
  }

  filterPhotos(productId) {
    const photos = this.props.photos;
    const productPhoto = photos.filter(photo =>
      photo.productId === productId,
    );
    return productPhoto;
  }

  starAverage(reviews) {
    let starSum = 0;
    reviews.forEach((review) => {
      starSum += review.star;
    });
    return starSum / reviews.length;
  }

  // Styled Components
  render() {
    console.log(this.state)
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
      input: {
        width: 60,
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
                this.props.categories.map((category) => {
                  return (
                    <Checkbox
                      label={category.title}
                      style={styles.checkbox}
                      key={category.id}
                      onCheck={() => this.handleCheck(category)}
                      checked={this.state.selectedCategories.includes(category)}
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
              this.props.products.map((product) => {
                return (
                  <ProductSnapshot
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    img={this.filterPhotos(product.id)[0].photoURL}
                    price={product.price}
                    review={this.filterReviews(product.id)[0].description}
                    stars={this.starAverage(this.filterReviews(product.id))}
                  />
                );
              })
            }
          </ProductsWrapper>
        </div>
      </MuiThemeProvider>
    );
  }
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

AllProducts.propTypes = {
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
};
