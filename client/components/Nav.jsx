import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { TextField, IconButton, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { blue500 } from 'material-ui/styles/colors';
import styled from 'styled-components';
import { H1 } from './reusableStyles';
import { logout } from '../store/reducers/user';

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
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogout = this.renderLogout.bind(this);
  }


  renderLogout() {
    return (
      <div>
        <FlatButton
          label="Log Out"
          onClick={this.props.logout}
        />
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const authButton = user.id ?
      this.renderLogout() :
      (<div>
        <FlatButton
          href="/signup"
          label="Sign Up"
        />
        <FlatButton
          href="/login"
          label="Log In"
        />
      </div>);

    return (
      <MuiThemeProvider>
        <NavWrapper>
          <a href="/">
            <h1>FORTE</h1>
          </a>
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
            {authButton}
          </NavDivWrapper>
        </NavWrapper>
      </MuiThemeProvider>
    );
  }
}

// Container
const mapState = (state => ({
  user: state.user,
}));

const mapDispatch = (dispatch => ({
  logout: () => {
    dispatch(logout());
  },
}));

export default connect(mapState, mapDispatch)(Nav);
