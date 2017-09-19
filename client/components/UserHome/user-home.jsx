// npms
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Style
import { FlatButton, TextField, RaisedButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import CommunicationEmail from 'material-ui/svg-icons/communication/contact-mail';
import CommunicationLocation from 'material-ui/svg-icons/communication/location-on';
import { H1, H2, ImagesWrapper } from '../reusableStyles';

// Redux
import { updateAddress } from '../../store/reducers/user-form/address';
import { updateEmail } from '../../store/reducers/user-form/email';
import { updatePassword } from '../../store/reducers/user-form/password';
import { editUser } from '../../store/reducers/user-form';
import UserOrders from './UserOrders.jsx';


// Styles
const styles = {
  flatButton: {
    marginLeft: 10,
  },
  personalDetail: {
    marginLeft: 50,
  }
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
    const { user, updateAddress, updateEmail, updatePassword } = this.props;

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
        <div style={styles.personalDetail}>
          <H1>Welcome!</H1>
          <div>
            <H2>Personal Detail</H2>
            <FlatButton
              label="Edit your profile"
              primary={true}
              icon={<EditIcon hoverColor={blue500} />}
              style={styles.flatButton}
              onClick={this.toggleEdit}
            />
            {PersonalDetailDiv}
          </div>
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
