import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { H1, PhotoDivider } from './reusableStyles';


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

  const CarouselWrapper = styled.div`
    display: 'flex';
    flexWrap: 'wrap';
    justifyContent: 'space-around';
    margin: 40px 10px;
  `;

  const TempPhoto = styled.div`
    background-color: '#cfd8dc';
    height: '200px';
    vertical-align: 'middle';
  `;

  const OurPicksDivider = PhotoDivider.extend`
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg");
  `;
  console.log("PICK", picksProducts);
  // Styled Components
  return (
    <MuiThemeProvider>
      <div>
        <CarouselWrapper>
          <GridList style={styles.gridList} cols={5}>
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
        </CarouselWrapper>
        <OurPicksDivider>
          <H1>Our Picks</H1>
        </OurPicksDivider>
        {console.log("PRODUCTS", picksProducts)}
        <div className="our-picks">
          {
            picksProducts.map((pick) => {
              return (
                <Link to={`/categories/${pick.id}`} key={pick.id}>
                  <p>{pick.title}</p>
                  <img src={pick.photos[0].photoURL} alt={pick.title} height="200" width="300" />
                </Link>
              );
            })
          }
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
  error: PropTypes.object,
};
