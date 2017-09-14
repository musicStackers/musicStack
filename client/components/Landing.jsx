import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Component
function Landing() {
  const categories = [// bring in categories from mapState as Props
    { id: 1, title: 'guitars' },
    { id: 2, title: 'drums' },
    { id: 3, title: 'saxophones' },
    { id: 4, title: 'strings' },
    { id: 5, title: 'synths' },
  ];

  const picks = [// bring in 3 products from mapState as Props
    { id: 1, title: 'best guitar' },
    { id: 2, title: 'best drums' },
    { id: 3, title: 'best flutes' },
  ];

  return (
    <div className="container">
      <div className="category-carousel">
        {
          categories.map((category) => {
            return (
              <div
                className="category-box"
                key={category.id}
              >
                <Link to={`/categories/${category.id}`}>
                  {category.title}
                </Link>
              </div>
            );
          })
        }
      </div>
      <div className="photo-divider">
        <div className="photo-divider-text">
          <h2>Our Picks</h2>
        </div>
      </div>
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
  );
}

// Container
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Landing);
