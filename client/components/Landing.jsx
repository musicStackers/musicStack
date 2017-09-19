import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { PhotoDivider, ImagesWrapper, PhotoH1 } from './reusableStyles';


// Component
function Landing({ categories, picksProducts, picksPhotos }) {
  const styles = {
    gridList: {
      flexWrap: 'no-wrap',
      overflowX: 'auto',
    },
    tileTitle: {
      fontSize: 30,
    },
    pickGridList: {
      flexWrap: 'wrap',
      overflowX: 'auto',
      overflowY: 'auto',
    },
    pickPhotoStyle: {
      display: 'block',
      margin: '0 auto',
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
  `;

  const CategoryPhotoGrid = () => (
    <ImagesWrapper>
      <GridList
        style={styles.gridList}
        padding={2}
        cellHeight={400}
        cols={5}
      >
        <GridTile
          containerElement={<Link to="/products" />}
          key={0}
          title="All Products"
          titleStyle={styles.tileTitle}
          cols={2}
        >
          <CatPhotoWrapper>
            <img
              src="/assets/home-allproducts.jpg"
              alt="All Products"
              height="400px"
            />
          </CatPhotoWrapper>
        </GridTile>
        {
          categories.map(category => (
            <GridTile
              containerElement={<Link to={`/products/category/${category.id}`} />}
              style={styles.gridList}
              key={category.id}
              title={category.title}
              titleStyle={styles.tileTitle}
              cols={1}
            >
              <CatPhotoWrapper>
                <img
                  src={`/assets/home-${category.title.toLowerCase()}.jpg`}
                  alt={category.title}
                  height="400px"
                />
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
          style={styles.pickGridList}
          cellHeight={300}
          cols={3}
        >
          {
            picksProducts.map((product) => {
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
                        style={styles.pickPhotoStyle}
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
  const picksProducts = state.products.slice(0, 6);
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

