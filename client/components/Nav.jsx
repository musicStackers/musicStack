import React from 'react';
import { connect } from 'react-redux';
import { TextField, IconButton, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { blue500 } from 'material-ui/styles/colors';
import styled from 'styled-components';
import { H1 } from './reusableStyles';

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

const NavWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const NavDivWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  vertical-align: middle;
`;

// Component
const Nav = () => {
  return (
    <MuiThemeProvider>
      <NavWrapper>
        <H1>FORTE</H1>
        <NavDivWrapper>
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
        </NavDivWrapper>
        <NavDivWrapper>
          <IconButton
            iconStyle={styles.icon}
            style={styles.button}
          >
            <CartIcon hoverColor={blue500} />
          </IconButton>
          <FlatButton label="Sign Up" />
          <FlatButton label="Log In" />
        </NavDivWrapper>
      </NavWrapper>
    </MuiThemeProvider>
  );
};

// Container
const mapState = null;

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Nav);
