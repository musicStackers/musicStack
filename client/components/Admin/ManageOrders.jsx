import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui';
import { fetchOrders, updateOrderStatus } from '../../store/reducers/orders';
import { fetchOrderProduct } from '../../store/reducers/order_product';
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

// Styles
const styles = {
};

/**
 * COMPONENT
 */
class ManageOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
    };
  }

  componentDidMount() {
    const { fetchOrders, fetchOrderProduct } = this.props;
    fetchOrders();
    fetchOrderProduct();
  }

  render() {
    const { orders, updateOrderStatus } = this.props;

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
              <TableHeaderColumn>
                Order Status:
                <select value={this.state.filter} onChange={e => this.setState({ filter: e.target.value })}>
                  <option value="all">All</option>
                  <option value="created">Created</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              orders.length && orders
                .filter((order) => {
                  if (this.state.filter === 'all') return true;
                  return order.status === this.state.filter;
                })
                .sort((a, b) => a.id - b.id)
                .map((order) => {
                  return (
                    <Table key={order.id}>
                      <TableBody displayRowCheckbox={false}>
                        <TableRow displayBorder={false} selectable={false}>
                          <TableRowColumn>
                            <NavLink to={`/admin/orders/${order.id}`}>{order.id}</NavLink>
                          </TableRowColumn>
                          <TableRowColumn>
                            {order.email}
                          </TableRowColumn>
                          <TableRowColumn>
                            {order.address}
                          </TableRowColumn>
                          <TableRowColumn>
                            <DropDownMenu
                              onChange={(event, index, value) => updateOrderStatus(order.id, value)}
                              value={order.status}
                            >
                              <MenuItem value="created" primaryText="Created" />
                              <MenuItem value="processing" primaryText="Processing" />
                              <MenuItem value="cancelled" primaryText="Cancelled" />
                              <MenuItem value="completed" primaryText="Completed" />
                            </DropDownMenu>
                          </TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn>
                            <Router history={history}>
                              <Route exact path={`/admin/orders/${order.id}`} render={props => <OrderDetail order={order} />} />
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
});

const mapDispatch = (dispatch, ownProps) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchOrderProduct: () => dispatch(fetchOrderProduct()),
  updateOrderStatus: (orderId, status) => dispatch(updateOrderStatus(orderId, status)),
});

export default connect(mapState, mapDispatch)(ManageOrders);
