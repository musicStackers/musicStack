import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import history from './history';
import { Nav, Landing, AllProducts, AdminDashboard, Product, Cart, Login, Signup, Checkout, UserHome, ReviewForm } from './components';
import { me } from './store/reducers/user/';
import { fetchCategories } from './store/reducers/categories';
import { fetchCategoryProduct } from './store/reducers/category_product';
import { fetchReviews } from './store/reducers/reviews';
import { fetchProducts } from './store/reducers/products';
import { fetchPhotos } from './store/reducers/photos';
import { fetchCart } from './store/reducers/cart';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <div>
          <Nav />
          <Switch>
            {/* {
              isLoggedIn &&
                <Switch>
                  <Route path="/home" component={UserHome} />
                </Switch>
            } */}
            <Route path="/products/:category/" component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/product/:productId" component={Product} />
            <Route path="/admin" component={AdminDashboard} />
            <Route exact path="/signup/" component={Signup} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/cart/checkout" component={Checkout} />
            <Route path="/home" component={UserHome} />
            <Route component={Landing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchCategories());
      dispatch(fetchProducts());
      dispatch(fetchReviews());
      dispatch(fetchCategoryProduct());
      dispatch(fetchPhotos());
      dispatch(fetchCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
