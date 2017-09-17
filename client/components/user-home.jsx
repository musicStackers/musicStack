import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from 'material-ui/svg-icons/content/create';
import { blue500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H1, H2, H3, ImagesWrapper } from './reusableStyles';


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

  handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    alert('Changes have been saved!', credentials.email, credentials.password);
  }

  render() {
    const { user, email, address, orders } = this.props;
    const userOrders = orders.filter(order => +order.userId === user.id);
    return (
      <MuiThemeProvider>
        <div>
          <H1>Welcome!</H1>
          <ImagesWrapper>
            <div>
              <div>
                <H2>Personal Detail</H2>
              </div>
              <div>
                <EditIcon hoverColor={blue500} />
              </div>
              <h5>Email: {email}</h5>
              <h5>Address: {address}</h5>
              <div>
                <form onSubmit={this.handleSubmit} >
                  <label htmlFor="email">Email: </label>
                  <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                  <label htmlFor="address">Address:</label>
                  <input name="address" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                  <input type="submit" value="Confirm Edit" />
                </form>
              </div>
            </div>
            <div>
              <H2>Your Orders</H2>
              {
                userOrders.map((order) => {
                  return (
                    <Link to={`/order/${order.id}`} key={order.id}>
                      {
                        <h5>{order.createdAt.split("T")[0]}</h5>
                      }
                    </Link>
                  );
                })
              }
            </div>
          </ImagesWrapper>
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
    email: state.user.email,
    address: state.user.address,
    orders: state.orders,
    user: state.user,
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orders: PropTypes.string.isRequired,
};

