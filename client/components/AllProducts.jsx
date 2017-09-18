import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import { PhotoH1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';
import ProductSnapshot from './ProductSnapshot.jsx';

// Component
class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: this.props.categories.map(category => category.id) || [],
      selectedMinPrice: 0,
      selectedMaxPrice: 0,
      selectedStarMin: 0,
    };
  }

  componentWillReceiveProps() {
    this.setState(state => ({
      selectedCategories: this.props.categories.map(category => category.id),
    }));
  }

  handleCheck(categoryId) {
    this.setState(state => ({
      selectedCategories: state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter(catId => catId !== categoryId)
        : [...state.selectedCategories, categoryId],
    }));
  }

  filterProductsByCategory() {
    const products = [];
    this.props.productCategories.forEach((el) => {
      if (this.state.selectedCategories.includes(el.categoryId)) {
        products.push(el.productId);
      }
    });
    const filteredProducts = this.props.products.filter(product =>
      products.includes(product.id),
    );
    return filteredProducts;
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
    return productPhoto[0].photoURL;
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
    if (!this.props.photos.length) return <div />;

    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
        paddingLeft: 5,
      },
      input: {
        width: 60,
        paddingLeft: 5,
        marginRight: 20,
      },
    };

    const ProductsTitlePhoto = PhotoDivider.extend`
      height: 200px;
      background-image: url('/assets/allproductsheader.jpg');
    `;

    const ProductsWrapper = styled.div`
      height:100%;
      width: calc(100% - 250px);
      float: left;
      border-left: 2px solid #69b6ff;
    `;
    const renderProducts = this.filterProductsByCategory();

    return (
      <MuiThemeProvider>
        <div>
          <ProductsTitlePhoto>
            <PhotoH1>Products</PhotoH1>
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
                      onCheck={() => this.handleCheck(category.id)}
                      checked={this.state.selectedCategories.includes(category.id)}
                    />
                  );
                })
              }
            </div>
            <div>
              <H3>Price</H3>
              <TextField
                name="minprice"
                floatingLabelText="Min"
                style={styles.input}
              />
              <TextField
                name="maxprice"
                floatingLabelText="Max"
                style={styles.input}
              />
            </div>
            <div>
              <H3>Stars</H3>
            </div>
          </SideBar>
          <ProductsWrapper>
            {
              renderProducts.map((product) => {
                return (
                  <ProductSnapshot
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    img={this.filterPhotos(product.id)}
                    price={product.price}
                    description={product.description}
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
const mapState = (state) => ({
  categories: state.categories,
  products: state.products,
  reviews: state.reviews,
  photos: state.photos,
  productCategories: state.categoryProduct,
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllProducts);

AllProducts.propTypes = {
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
  productCategories: PropTypes.array.isRequired,
};
