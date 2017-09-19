import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui';
import { fetchOrdersByUserId } from '../../store/reducers/orders';
import { Router, Route, NavLink } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import OrderDetail from './OrderDetail.jsx';
import history from '../../history';

/**
 * COMPONENT
 */
class UserOrders extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchOrdersByUserId, user } = this.props;
    if (user) {
      fetchOrdersByUserId(user.id);
    }
  }

  render() {
    const { orders, user } = this.props;
    return (
      <MuiThemeProvider>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckboe={false}
          >
            <TableRow>
              <TableHeaderColumn>Order ID</TableHeaderColumn>
              <TableHeaderColumn>Order Email</TableHeaderColumn>
              <TableHeaderColumn>Order Address</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              orders.length && orders
                .sort((a, b) => a.id - b.id)
                .map((order) => {
                  return (
                    <Table key={order.id}>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow displayBorder={false} selectable={false}>
                          <TableRowColumn>
                            <NavLink to={`/user/orders/${order.id}`}>{order.id}</NavLink>
                          </TableRowColumn>
                          <TableRowColumn>
                            {order.email}
                          </TableRowColumn>
                          <TableRowColumn>
                            {order.address}
                          </TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn>
                            <Router history={history}>
                              <Route exact path={`/user/orders/${order.id}`} render={props => <OrderDetail order={order} />} />
                            </Router>
                          </TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                  );
                })
            }
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => ({
  orders: state.orders,
  user: state.user,
});

const mapDispatch = (dispatch, ownProps) => ({
  fetchOrdersByUserId: (userId) => dispatch(fetchOrdersByUserId(userId)),
});

export default connect(mapState, mapDispatch)(UserOrders);
