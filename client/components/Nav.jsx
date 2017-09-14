import React from 'react';
import { connect } from 'react-redux';
import { TextField, IconButton, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { blue500 } from 'material-ui/styles/colors';

// Styles
const styles = {
  icon: {
    width: 32,
    height: 32,
  },
  button: {
    width: 60,
    height: 60,
    padding: 5,
    top: 20,
  },
  input: {
    width: 500,
  },
};

// Component
const Nav = () => {
  return (
    <MuiThemeProvider>
      <div className="nav">
        <div className="logo">
          <h1>FORTE</h1>
        </div>
        <div className="search">
          <TextField
            hintText="Search"
            style={styles.input}
          />
          <IconButton
            iconStyle={styles.icon}
            style={styles.button}
          >
            <SearchIcon hoverColor={blue500} />
          </IconButton>
        </div>
        <div className="user-actions">
          <IconButton
            iconStyle={styles.icon}
            style={styles.button}
          >
            <CartIcon hoverColor={blue500} />
          </IconButton>
          <FlatButton label="Sign Up" />
          <FlatButton label="Log In" />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

// Container
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Nav);
