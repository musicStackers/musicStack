import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Nav, Landing, AllProducts, Dashboard, Auth, Product, Cart } from './components';
import { me } from './store/reducers/user/';
import { fetchCategories } from './store/reducers/categories';
import { fetchCategoryProduct } from './store/reducers/category_product';
import { fetchOrders } from './store/reducers/orders';
import { fetchOrderProduct } from './store/reducers/order_product';
import { fetchCategories } from './store/reducers/categories';
import { fetchCategories } from './store/reducers/categories';







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
            {
              // isLoggedIn &&
              //   <Switch>
              //     { Routes placed here are only available after logging in }
              //     <Route path="/home" component={UserHome} />
              //   </Switch>
            }
            <Route path="/products/:category/" component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/product/:productId" component={Product} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/auth/" component={Auth} />
            <Route exact path="/cart" component={Cart} />
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
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
