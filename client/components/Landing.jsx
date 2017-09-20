import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { PhotoDivider, ImagesWrapper, PhotoH1, H2 } from './reusableStyles';


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
    background-color: #ffffff;
    margin: 0;
  `;

  const PickPhotoWrapper = styled.div`
    vertical-align: middle;
    overflow: hidden;
    margin: 10px auto 40px auto;
    height: 250px;
    width: 250px;
    border-radius: 100%;
    border: 2px solid #373737;
    text-align: center;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  `;

  const PicksPhotoH1 = PhotoH1.extend`
    color: #1e88e5;
  `;

  const PhotoH2 = H2.extend`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(255, 255, 255, .7);
    padding: 0;
    color: #373737;
    width: 70%;
  `;

  const PickedProductGrid = (() => (
    <div className="our-picks">
      <ImagesWrapper>
        {
          picksProducts.map((product) => {
            const photo = picksPhotos.find(p => +p.productId === +product.id);
            return (
              <Link to={`/product/${product.id}`}>
                <PickPhotoWrapper
                  key={product.id}
                  style={{ backgroundImage: `url(${photo && photo.photoURL})` }}
                >
                  <PhotoH2>{product.title}</PhotoH2>
                </PickPhotoWrapper>
              </Link>
            );
          })
        }
      </ImagesWrapper>
    </div>
  ));

  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        {CategoryPhotoGrid()}
        <OurPicksDivider>
          <PicksPhotoH1>Our Picks</PicksPhotoH1>
        </OurPicksDivider>
        {PickedProductGrid()}
      </div>
    </MuiThemeProvider>
  );
}

// Container
const mapState = (state) => {
  const picksProducts = state.products.slice(6, 9);
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

    // background-image: url('/assets/allproductsheader.jpg');
