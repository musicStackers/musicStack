import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, FlatButton, AutoComplete } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import styled from 'styled-components';
import { TitleH1 } from './reusableStyles';
import { logout } from '../store/reducers/user';
import history from '../history';

// Styles
const styles = {
  icon: {
    width: 32,
    height: 32,
  },
  searchButton: {
    width: '10%',
    height: 60,
    padding: 1,
    top: 11,
  },
  searchInput: {
    width: '80%',
    top: 1,
  },
  underlineStyle: {
    borderColor: '#1e88e5',
    width: '100%',
  },
  cartButton: {
    width: 60,
    height: 60,
    padding: 5,
    top: -5,
  },
  title: {
    marginTop: 15,
    width: 250,
    minWidth: 250,
  },
  buttons: {
    display: 'inline-block',
  },
};

const NavWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const NavSearchDivWrapper = styled.div`
  padding: 10px;
  vertical-align: middle;
  flex-basis: 60%;
`;

const NavButtonDivWrapper = styled.div`
  margin-top: 3px;
  padding: 10px;
  vertical-align: middle;
  flex-basis: 20%;
  min-width: 260px;
  top: 20px;
`;

const NavLogoWrapper = styled.div`
  flex-basis:20%;
`;

// Component
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.renderDashLogout = this.renderDashLogout.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
  }

  handleSearchRequest(string) {
    const { products } = this.props;
    const product = products.find(eachProduct => eachProduct.title === string);
    if (product) {
      history.push(`/product/${product.id}`);
    }
  }

  renderDashLogout() {
    const { user } = this.props;
    return (
      <div style={styles.buttons}>
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
          containerElement={<Link to="" />}
          label="Log Out"
          onClick={this.props.logout}
        />
      </div>
    );
  }

  render() {
    const renderSignupLogin = () => (
      <div style={styles.buttons}>
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

    const { user, products } = this.props;
    const authButton = user.id
      ? this.renderDashLogout()
      : renderSignupLogin();
    const productNames = products.map(product => product.title);

    return (
      <MuiThemeProvider>
        <NavWrapper>
          <NavLogoWrapper>
            <Link to="/" style={styles.title} >
              <TitleH1>Forte</TitleH1>
            </Link>
          </NavLogoWrapper>
          <NavSearchDivWrapper>
            <IconButton
              iconStyle={styles.icon}
              style={styles.searchButton}
            >
              <SearchIcon />
            </IconButton>
            <AutoComplete
              hintText="Search"
              dataSource={productNames}
              filter={AutoComplete.caseInsensitiveFilter}
              onNewRequest={this.handleSearchRequest}
              style={styles.searchInput}
              underlineFocusStyle={styles.underlineStyle}
              fullWidth
            />
          </NavSearchDivWrapper>
          <NavButtonDivWrapper>
            <IconButton
              containerElement={<Link to="/cart" />}
              iconStyle={styles.icon}
              style={styles.cartButton}
            >
              <CartIcon hoverColor="1e88e5" />
            </IconButton>
            {authButton}
          </NavButtonDivWrapper>
        </NavWrapper>
      </MuiThemeProvider>
    );
  }
}

// Container
const mapState = (state => ({
  user: state.user,
  products: state.products,
}));

const mapDispatch = (dispatch => ({
  logout: () => {
    dispatch(logout());
  },
}));

export default connect(mapState, mapDispatch)(Nav);
