import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { TextField, RaisedButton, FlatButton } from 'material-ui';

import ManageOrders from './ManageOrders.jsx';
import ManageProdcuts from './ManageProducts.jsx';
import ManageUsers from './ManageUsers.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Styles
const styles = {
  raisedButton: {
    width: 180,
    height: 60,
    margin: '20px 100px',
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
        <h1>Hi Admin!</h1>
        <h3>{`currently logged in as: ${email}`}</h3>
        <RaisedButton
          label="Manage Products"
          style={styles.raisedButton}
        />
        <RaisedButton
          label="Manage Users"
          style={styles.raisedButton}
        />
        <RaisedButton
          label="Manage Orders"
          style={styles.raisedButton}
        />
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

