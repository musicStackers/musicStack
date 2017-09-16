import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { H1, H2, H3, ImagesWrapper } from './reusableStyles';


/**
 * COMPONENT
 */

// const fakeUser = {
//   id: 1,
//   Email: 'janinegarcia@gmail.com',
//   Address: 'Chicago, IL',
// }

// const orders = [
//   { title: 'Bass' },
//   { title: 'Guitar' },
//   { title: 'Piano' },
// ]

export const UserHome = ({ email, address, orders }) => {
  return (
    <MuiThemeProvider>
      <div>
        <H1>Welcome!</H1>
        <ImagesWrapper>
          <div>
            <H2>Personal Detail</H2>
            <h5>Email: {users.email}</h5>
            <h5>Address: {fakeUser.address}</h5>
          </div>
          <div>
            <H2>Your Orders</H2>
            {
              orders.map((order) => {
                return (
                  <Link to={`/orders/${fakeUser.id}`} key={order.id}>
                    <h5>{order.title}</h5>
                  </Link>
                );
              })
            }
          </div>
        </ImagesWrapper>
      </div>
    </MuiThemeProvider>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    address: state.user.address,
    orders: state.orders,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orders: PropTypes.string.isRequired,
};

