import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { H1, PhotoDivider, ImagesWrapper, PhotoH1 } from './reusableStyles';


// Component
function Landing({ categories, picksProducts, picksPhotos }) {
  const styles = {
    gridList: {
      flexWrap: 'no-wrap',
      overflowX: 'auto',
      overflowY: 'auto',
    },
    tileTitle: {
      fontSize: 30,
    },
  };

  const CatPhotoWrapper = styled.div`
    background-color: #cfd8dc;
    vertical-align: middle;
    overflow: hidden;
  `;

  const PickPhotoWrapper = styled.div`
    vertical-align: middle;
    overflow: hidden;
    margin: 0 auto;
    height: auto;
    border-radius: 50%;
  `;

  const CategoryPhotoGrid = () => (
    <ImagesWrapper>
      <GridList
        style={styles.gridList}
        padding={2}
        cellHeight={400}
      >
        <GridTile
          key={0}
          title="All Products"
          cols={2}
          titleStyle={styles.tileTitle}
        >
          <CatPhotoWrapper>
            <Link to="/products">
              <img
                src="/assets/home-allproducts.jpg"
                alt="All Products"
                height="400px"
              />
            </Link>
          </CatPhotoWrapper>
        </GridTile>
        {
          categories.map(category => (
            <GridTile
              style={styles.gridList}
              key={category.id}
              title={category.title}
              titleStyle={styles.tileTitle}
            >
              <CatPhotoWrapper>
                <Link to={`/categories/${category.id}`}>
                  <img
                    src={`/assets/home-${category.title.toLowerCase()}.jpg`}
                    alt={category.title}
                    height="400px"
                  />
                </Link>
              </CatPhotoWrapper>
            </GridTile>
          ))
        }
      </GridList>
    </ImagesWrapper>
  );

  const OurPicksDivider = PhotoDivider.extend`
    height: 200px;
    background-image: url('/assets/allproductsheader.jpg');
  `;

  const PickedProuctGrid = (() => (
    <div className="our-picks">
      <ImagesWrapper>
        <GridList
          style={styles.gridList}
          cols={3}
          padding={2}
          cellHeight={300}
        >
          {
            picksProducts.map((product, index) => {
              const photo = picksPhotos.find(p => +p.productId === +product.id);
              return (
                <GridTile
                  key={product.id}
                  title={product.title}
                  cols={1}
                >
                  <PickPhotoWrapper>
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <img
                        src={photo && photo.photoURL}
                        alt={photo && photo.title}
                        height="300px"
                        width="300px"
                      />
                    </Link>
                  </PickPhotoWrapper>
                </GridTile>
              );
            })
          }
        </GridList>
      </ImagesWrapper>
    </div>
  ));

  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        {CategoryPhotoGrid()}
        <OurPicksDivider>
          <PhotoH1>Our Picks</PhotoH1>
        </OurPicksDivider>
        {PickedProuctGrid()}
      </div>
    </MuiThemeProvider>
  );
}

// Container
const mapState = (state, ownProps) => {
  const picksProducts = state.products.slice(0, 4);
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
