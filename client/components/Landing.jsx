import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import { H1, PhotoDivider } from './reusableStyles';

// Component
function Landing() {
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

  const picks = [// bring in 3 products from mapState as Props
    { id: 1, title: 'best guitar' },
    { id: 2, title: 'best drums' },
    { id: 3, title: 'best flutes' },
  ];

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
                        <img src={category.img} alt={category.title} height="200" width="300" />
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
        <div className="our-picks">
          {
            picks.map((pick) => {
              return (
                <Link to={`/categories/${pick.id}`} key={pick.id}>
                  <div className="pick-box">
                    <p>{pick.title}</p>
                  </div>
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
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Landing);
