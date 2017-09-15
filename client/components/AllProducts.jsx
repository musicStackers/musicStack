import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import { H1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';
import ProductSnapshot from './ProductSnapshot.jsx';

// Component
function AllProducts() {
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

  const categories = [ // bring in categories from mapState as Props
    { id: 1, title: 'guitars', img: 'http://via.placeholder.com/350x150' },
    { id: 2, title: 'drums', img: 'http://via.placeholder.com/350x150' },
    { id: 3, title: 'saxophones', img: 'http://via.placeholder.com/350x150' },
    { id: 4, title: 'strings', img: 'http://via.placeholder.com/350x150' },
    { id: 5, title: 'synths', img: 'http://via.placeholder.com/350x150' },
    { id: 6, title: 'pianos', img: 'http://via.placeholder.com/350x150' },
    { id: 7, title: 'electronics', img: 'http://via.placeholder.com/350x150' },
  ];

  const products = [ // bring in 3 products from mapState as Props
    { id: 1, title: 'best guitar', img: 'http://via.placeholder.com/350x150', price: 4, stars: 3, review: 'This guitar set is so awesome!!! It has everything for you to play immediately. ' },
    { id: 2, title: 'best drums', img: 'http://via.placeholder.com/350x150', price: 4, stars: 3, review: 'This guitar set is so awesome!!! It has everything for you to play immediately. ' },
    { id: 3, title: 'best flutes', img: 'http://via.placeholder.com/350x150', price: 4, stars: 3, review: 'This guitar set is so awesome!!! It has everything for you to play immediately. ' },
  ];

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
              categories.map((category) => {
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
            products.map((product) => {
              return (
                <ProductSnapshot
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  img={product.img}
                  price={product.price}
                  stars={product.stars}
                  review={product.review}
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
// const mapState = (state, ownProps) => ({
//   categories: state.categories,
//   products: state.products,
// });

// const mapDispatch = (dispatch) => {
//   return {
//   };
// };
const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllProducts);
