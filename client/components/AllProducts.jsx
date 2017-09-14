import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import { H1, H2, H3, PhotoDivider, SideBar } from './reusableStyles';

// Component
function AllProducts() {
  const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };

  const ProductsTitlePhoto = PhotoDivider.extend`
    background-image: url('http://via.placeholder.com/350x150');
  `;

  const categories = [// bring in categories from mapState as Props
    { id: 1, title: 'guitars', img: 'http://via.placeholder.com/350x150' },
    { id: 2, title: 'drums', img: 'http://via.placeholder.com/350x150' },
    { id: 3, title: 'saxophones', img: 'http://via.placeholder.com/350x150' },
    { id: 4, title: 'strings', img: 'http://via.placeholder.com/350x150' },
    { id: 5, title: 'synths', img: 'http://via.placeholder.com/350x150' },
    { id: 6, title: 'pianos', img: 'http://via.placeholder.com/350x150' },
    { id: 7, title: 'electronics', img: 'http://via.placeholder.com/350x150' },
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
              />
            </div>
            <div>
              <H3>Min</H3>
              <TextField
                name="maxprice"
              />
            </div>
          </div>
        </SideBar>
      </div>
    </MuiThemeProvider>
  );
}

// Container
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllProducts);
