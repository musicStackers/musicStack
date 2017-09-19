// npms
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Style
import { FlatButton, TextField, RaisedButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import CommunicationEmail from 'material-ui/svg-icons/communication/contact-mail';
import CommunicationLocation from 'material-ui/svg-icons/communication/location-on';
import { H1, H2, H3, ImagesWrapper } from './reusableStyles';

// Redux
import { updateAddress } from '../../store/reducers/user-form/address';
import { updateEmail } from '../../store/reducers/user-form/email';
import { updatePassword } from '../../store/reducers/user-form/password';
import { editUser } from '../../store/reducers/user-form';
import UserOrders from './UserOrders.jsx';


// Styles
const styles = {
  flatButton: {
    marginLeft: 30,
  },
};

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user, fetchOrdersByUserId } = this.props;
    fetchOrdersByUserId(user.id);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  handleSubmit(e) {
    const { address, email, password } = e.target;
    const { user } = this.props;
    e.preventDefault();
    this.props.editThisUser(address.value, email.value, user.id, password.value);
    this.toggleEdit();
  }

  render() {
    const { user, email, address, orders, password, updateAddress, updateEmail, updatePassword } = this.props;

    const userOrders = orders.filter(order => +order.userId === +user.id);
    const PersonalDetailDiv = (
      <div>
        {
          this.state.edit ?
            <div>
              <form onSubmit={this.handleSubmit} >
                <TextField
                  name="email"
                  floatingLabelText="Email"
                  defaultValue={user.email}
                  onChange={e => updateEmail(e.target.value)}
                />
                <br />
                <TextField
                  name="address"
                  floatingLabelText="Address"
                  defaultValue={user.address}
                  onChange={e => updateAddress(e.target.value)}
                />
                <br />
                <TextField
                  name="password"
                  floatingLabelText="Password"
                  hintText="*******"
                  onChange={e => updatePassword(e.target.value)}
                />
                <br />
                <RaisedButton
                  label="Submit"
                  type="submit"
                />
              </form>
            </div> :
            <List>
              <ListItem
                leftIcon={<CommunicationEmail />}
                primaryText={user.email}
                disabled={true}
              />
              <ListItem
                leftIcon={<CommunicationLocation />}
                primaryText={user.address}
                secondaryText="Primary Address"
                disabled={true}
              />
            </List>
        }


      </div>
    );

    return (
      <MuiThemeProvider>
        <div>
          <H1>Welcome!</H1>
          <ImagesWrapper>
            <div>
              <div>
                <H2>Personal Detail</H2>
                <FlatButton
                  label="Edit your profile"
                  primary={true}
                  icon={<EditIcon hoverColor={blue500} />}
                  style={styles.flatButton}
                  onClick={this.toggleEdit}
                />
              </div>
              {PersonalDetailDiv}
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
