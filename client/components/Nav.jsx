import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
  flatButton: {
    float: 'left',
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginTop: '17px',
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
    this.renderDashLogout = this.renderDashLogout.bind(this);
  }


  renderDashLogout() {
    const { user } = this.props;
    return (
      <div style={styles.buttonWrapper}>
        {
          user.isAdmin ?
            <FlatButton
              containerElement={<Link to="/admin" />}
              label="Admin"
              style={styles.flatButton}
            /> :
            <FlatButton
              containerElement={<Link to="/home" />}
              label="User"
              style={styles.flatButton}
            />
        }
        <FlatButton
          label="Log Out"
          onClick={this.props.logout}
          style={styles.flatButton}
        />
      </div>
    );
  }

  render() {
    const renderSignupLogin = () => (
      <div style={styles.buttonWrapper}>
        <FlatButton
          containerElement={<Link to="/signup" />}
          label="Sign Up"
          style={styles.flatButton}
        />
        <FlatButton
          containerElement={<Link to="/login" />}
          label="Log In"
          style={styles.flatButton}
        />
      </div>
    );

    const { user } = this.props;
    const authButton = user.id ?
      this.renderDashLogout() :
      renderSignupLogin();

    return (
      <MuiThemeProvider>
        <NavWrapper>
          <Link to="/" >
            <H1>FORTE</H1>
          </Link>
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
