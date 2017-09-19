import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, IconButton, FlatButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { blue500 } from 'material-ui/styles/colors';
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
  cartButton: {
    width: 60,
    height: 60,
    padding: 5,
    top: -5,
  },
  buttonWrapper: {
    overflow: 'hidden',
    marginTop: 20,
    display: 'inline-block',
  },
  title: {
    marginTop: 15,
    width: 250,
    minWidth: 250,
  },
  flatButton: {
    marginTop: 5,
  },
};

const NavWrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const NavSearchDivWrapper = styled.div`
  padding: 10px;
  vertical-align: middle;
  width: 600px;
  margin-left: 2%;
`;

const NavCartDivWrapper = styled.div`
  margin-top: 3px;
  padding: 10px;
  vertical-align: middle;
  width: 260px;
  min-width: 260px;
  top: 20px;
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

    const { user, products } = this.props;
    const authButton = user.id ?
      this.renderDashLogout() :
      renderSignupLogin();
    const productNames = products.map(product => product.title);

    return (
      <MuiThemeProvider>
        <NavWrapper>
          <Link to="/" style={styles.title} >
            <TitleH1>FORTE</TitleH1>
          </Link>
          <AutoComplete
            hintText=""
            dataSource={productNames}
            filter={AutoComplete.caseInsensitiveFilter}
            onNewRequest={this.handleSearchRequest}
          />
          <NavSearchDivWrapper>
            <TextField
              hintText="Search"
              style={styles.searchInput}
            />
            <IconButton
              iconStyle={styles.icon}
              style={styles.searchButton}
            >
              <SearchIcon hoverColor={blue500} />
            </IconButton>
          </NavSearchDivWrapper>
          <NavCartDivWrapper>
            <IconButton
              iconStyle={styles.icon}
              style={styles.cartButton}
            >
              <CartIcon hoverColor={blue500} />
            </IconButton>
            {authButton}
          </NavCartDivWrapper>
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
