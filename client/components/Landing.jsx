import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { H1, PhotoDivider, ImagesWrapper } from './reusableStyles';


// Component
function Landing({ categories, picksProducts, picksPhotos }) {
  const styles = {
    gridList: {
      flexWrap: 'no-wrap',
      overflowX: 'auto',
      overflowY: 'auto',
    },
  };

  const CatPhotoWrapper = styled.div`
    background-color: #cfd8dc;
    vertical-align: middle;
    overflow: hidden;
  `;

  const CategoryPhotos = () =>
    (<ImagesWrapper>
      <GridList
        style={styles.gridList}
        cols={5}
        padding={1}
        cellHeight={400}
      >
        <GridTile
          key={0}
          title="All Products"
          cols={2}
        >
          <CatPhotoWrapper>
            <Link to="/products">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
                alt="All Products"
              />
            </Link>
          </CatPhotoWrapper>
        </GridTile>
        {
          categories.map(category => (
            <GridTile
              key={category.id}
              title={category.title}
              cols={1}
            >
              <CatPhotoWrapper>
                <Link to={`/categories/${category.id}`}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
                    alt="All Products"
                  />
                </Link>
              </CatPhotoWrapper>
            </GridTile>
          ))
        }
      </GridList>
    </ImagesWrapper>);

  const OurPicksDivider = PhotoDivider.extend`
    height: 200px;
    background-image: url('/assets/allproductsheader.jpg');
  `;

  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        {CategoryPhotos()}
        <OurPicksDivider>
          <H1>Our Picks</H1>
        </OurPicksDivider>
        <div className="our-picks">
          <ImagesWrapper>
            {
              picksProducts.map((pick, index) => {
                if (index < 3) {
                  const photo = picksPhotos.find(p => +p.productId === +pick.id);
                  return (
                    <Link to={`/product/${pick.id}`} key={pick.id}>
                      <p>{pick.title}</p>
                      <img src={photo && photo.photoURL} alt={photo && photo.title} height="200" width="300" />
                    </Link>
                  );
                }
              })
            }
          </ImagesWrapper>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

// Container
const mapState = (state, ownProps) => {
  const picksProducts = state.products;
  const picksPhotos = state.photos;
  return {
    categories: state.categories,
    picksProducts,
    picksPhotos,
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Landing);

/**
 * PROP TYPES
 */
Landing.propTypes = {
  categories: PropTypes.string.isRequired,
  picksProducts: PropTypes.string.isRequired,
  picksPhotos: PropTypes.string.isRequired,
  error: PropTypes.object,
};
