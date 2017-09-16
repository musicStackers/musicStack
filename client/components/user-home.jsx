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

export const UserHome = ({ email, address, orders, user, }) => {
  const userOrders = orders.filter(order => +order.userId === user.id);
  return (
    <MuiThemeProvider>
      <div>
        <H1>Welcome!</H1>
        <ImagesWrapper>
          <div>
            <H2>Personal Detail</H2>
            <h5>Email: {user.email}</h5>
            <h5>Address: {user.address}</h5>
          </div>
          <div>
            <H2>Your Orders</H2>
            {
              userOrders.map((order) => {
                return (
                  <Link to={`/order/${order.id}`}>
                    <div>
                      {
                        order.createdAt
                        }
                    </div>
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
    user: state.user,
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

