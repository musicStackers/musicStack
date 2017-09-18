import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H1, H2, H3, ImagesWrapper } from '../reusableStyles';
import { updateAddress } from '../../store/reducers/user-form/address';
import { updateEmail } from '../../store/reducers/user-form/email';
import { updatePassword } from '../../store/reducers/user-form/password';
import { editUser } from '../../store/reducers/user-form';
import UserOrders from './UserOrders.jsx';

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { updateAddress, updateEmail, user, fetchOrdersByUserId } = this.props;
    updateAddress(user.address);
    updateEmail(user.email);
    fetchOrdersByUserId(user.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editThisUser(e.target.address.value, e.target.email.value, this.props.user.id, e.target.password.value);
  }

  render() {
    const { user, email, address, orders, password, updateAddress, updateEmail, updatePassword } = this.props;
    const userOrders = orders.filter(order => +order.userId === +user.id);
    return (
      <MuiThemeProvider>
        <div>
          <H1>Welcome!</H1>
          <ImagesWrapper>
            <div>
              <H2>Personal Detail</H2>
              <h5>Email: {email}</h5>
              <h5>Address: {address}</h5>
            </div>
            <div>
              <H2>Edit Your Info</H2>
              <form onSubmit={this.handleSubmit} >
                <label htmlFor="email">Email: </label>
                <input name="email" type="text" value={email} onChange={e => updateEmail(e.target.value)} />
                <label htmlFor="address">Address:</label>
                <input name="address" type="text" value={address} onChange={e => updateAddress(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input name="password" type="text" value={password} onChange={e => updatePassword(e.target.value)} />
                <input type="submit" value="Confirm Edit" />
              </form>
            </div>
          </ImagesWrapper>
          <div>
            <ImagesWrapper>
              <H2>Your Orders</H2>
            </ImagesWrapper>
            <UserOrders />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.userForm.email,
    address: state.userForm.address,
    password: state.userForm.password,
    orders: state.orders,
    user: state.user,
  };
};

const mapDispatch = dispatch => ({
  updateAddress: address => dispatch(updateAddress(address)),
  updateEmail: email => dispatch(updateEmail(email)),
  updatePassword: password => dispatch(updatePassword(password)),
  editThisUser: (address, email, userId, password) => dispatch(editUser(address, email, userId, password)),
});

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orders: PropTypes.string.isRequired,
};

