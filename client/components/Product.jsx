import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectField, MenuItem, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';
import { ReviewList, ReviewForm } from './';
import { H2, H3, Box, InnerBox } from './reusableStyles';
import { addProductToCart } from '../store/reducers/cart';
import Stars from './Stars.jsx';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ quantity: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addProductToCart(this.props.product.id, this.state.quantity);
  }

  starAverage(reviews) {
    let starSum = 0;
    reviews.forEach((review) => {
      starSum += review.star;
    });
    return starSum / reviews.length;
  }

  render() {
    const { product, reviews, photo, match } = this.props;
    const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const styles = {
      photo: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '3px',
        padding: '10px',
      },
      input: {
        width: '120px',
      },
      submit: {
        marginRight: '5px',
        marginBottom: '10px',
      },
      icon: {
        width: 32,
        height: 32,
      },
      button: {
        width: 60,
        height: 60,
        padding: 5,
        top: 20,
      },
    };

    const ProductDiv = styled.div`
      margin: 5rem 10rem;
      min-width: 40rem;
    `;
    const DetailH3 = H3.extend`
      margin: 0;
      padding 0;
    `;
    const FloatRight = styled.div`
      float: right;
    `;

    return (
      <MuiThemeProvider>
        <ProductDiv>
          <H2>{product && product.title}</H2>
          <Box>
            <InnerBox style={{ flexBasis: '40%' }}>
              <img src={photo && photo.photoURL} alt="Product" style={styles.photo} />
            </InnerBox>
            <InnerBox style={{ flexBasis: '60%' }}>
              <DetailH3>$ {product && product.price}.00</DetailH3>
              <FloatRight>
                <Stars
                  starRating={this.starAverage(reviews)}
                />
              </FloatRight>
              <div>
                <SelectField
                  name="cartQuantity"
                  value={this.state.quantity}
                  floatingLabelText="Quantity"
                  style={styles.input}
                  onChange={this.handleChange}
                >
                  {
                    quantityArr.map((val) => {
                      return (
                        <MenuItem
                          key={`select-${val}`}
                          value={val}
                          primaryText={val}
                        />
                      );
                    })
                  }
                </SelectField>
                <br />
                {
                  product && (product.isAvailable
                    ? <FlatButton
                      label="Add To Cart"
                      onClick={this.handleSubmit}
                    />
                    : <FlatButton
                      label="Unavailable"
                      disabled={true}
                    />)
                }
              </div>
              <p>{product && product.description}</p>
            </InnerBox>
          </Box>
          <ReviewList reviews={reviews} productId={match.params.productId} />
        </ProductDiv>
      </MuiThemeProvider>
    );
  }
}

const mapState = (state, ownProps) => {
  const productId = +ownProps.match.params.productId;

  const product = state.products.find(thisProduct => +thisProduct.id === productId);
  const reviews = state.reviews.filter(review => +review.productId === productId);
  const photo = state.photos.find(thisPhoto => +thisPhoto.productId === productId);

  return {
    reviews,
    product,
    photo,
  };
};

const mapDispatch = dispatch => ({
  addProductToCart: (productId, quantity) => dispatch(addProductToCart(+productId, +quantity)),
});

export default connect(mapState, mapDispatch)(Product);

