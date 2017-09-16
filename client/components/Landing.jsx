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
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
    gridTile: {
      backgroundColor: '#cfd8dc',
      height: '200px',
      verticalAlign: 'middle',
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)',
    },
  };

  const TempPhoto = styled.div`
    background-color: #cfd8dc;
    height: 200px;
    vertical-align: middle;
  `;

  const OurPicksDivider = PhotoDivider.extend`
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg");

  `;

  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        <ImagesWrapper>
          <GridList style={styles.gridList} cols={5}>
            <GridTile
              title="All Products"
            >
              <TempPhoto>
                <Link to="/products">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="All Products" height="200" width="300" />
                </Link>
              </TempPhoto>
            </GridTile>
            {
              categories.map((category) => {
                return (
                  <GridTile
                    key={category.id}
                    title={category.title}
                  >
                    <TempPhoto>
                      <Link to={`/categories/${category.id}`}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt={category.title} height="200" width="300" />
                      </Link>
                    </TempPhoto>
                  </GridTile>
                );
              })
            }
          </GridList>
        </ImagesWrapper>
        <OurPicksDivider>
          <H1>Our Picks</H1>
        </OurPicksDivider>
        <div className="our-picks">
          <ImagesWrapper>
            {
              picksProducts.map((pick) => {
                const photo = picksPhotos.find(p => +p.productId === +pick.id);
                return (
                  <Link to={`/categories/${pick.id}`} key={pick.id}>
                    <p>{pick.title}</p>
                    <img src={photo && photo.photoURL} alt={photo && photo.title} height="200" width="300" />
                  </Link>
                );
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
  const picksProducts = state.products.slice(0, 3);
  const picksPhotos = picksProducts.map(thisProduct => state.photos.find(photo => +photo.productId === +thisProduct.id));
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
