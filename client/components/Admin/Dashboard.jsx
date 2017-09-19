import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import history from '../../history';
import ManageOrders from './ManageOrders.jsx';
import ManageProducts from './ManageProducts.jsx';
import ManageUsers from './ManageUsers.jsx';
import { H1, H3 } from '../reusableStyles';
// Styles
const styles = {
  raisedButton: {
    width: 180,
    height: 60,
    margin: '20px 50px',
  },
};

/**
 * COMPONENT
 */
export const AdminDashboard = (props) => {
  const { email } = props;

  return (
    <MuiThemeProvider>
      <div>
        <H1>Hi Admin!</H1>
        <div>
          <RaisedButton
            label="Manage Products"
            style={styles.raisedButton}
            containerElement={<Link to="/admin/products" />}
          />
          <RaisedButton
            label="Manage Users"
            style={styles.raisedButton}
            containerElement={<Link to="/admin/users" />}
          />
          <RaisedButton
            label="Manage Orders"
            style={styles.raisedButton}
            containerElement={<Link to="/admin/orders" />}
          />
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/admin" component={ManageProducts} />
            <Route path="/admin/products" component={ManageProducts} />
            <Route path="/admin/users" component={ManageUsers} />
            <Route path="/admin/orders" component={ManageOrders} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

/**
 * CONTAINER
 */
const mapState = (({ user }) => {
  return {
    email: user.email,
  };
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminDashboard);

