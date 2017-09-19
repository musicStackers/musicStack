import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui';
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
import { fetchOrdersByUserId } from '../../store/reducers/orders';
import OrderDetail from './OrderDetail.jsx';
import history from '../../history';


class UserOrders extends Component {

  componentDidMount() {
    const { fetchOrdersByUserId, user } = this.props;
    if (Object.keys(user).length) {
      fetchOrdersByUserId(user.id);
    }
  }

  componentWillReceiveProps(props) {
    const { fetchOrdersByUserId } = this.props;
    if (props.user && props.user.id !== this.props.user.id) {
      fetchOrdersByUserId(props.user.id);
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
                            <NavLink to={`/home/orders/${order.id}`}>{order.id}</NavLink>
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
                              <Route exact path={`/home/orders/${order.id}`} render={props => <OrderDetail order={order} />} />
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

const mapState = (state, ownProps) => ({
  orders: state.orders,
  user: state.user,
});

const mapDispatch = (dispatch, ownProps) => ({
  fetchOrdersByUserId: (userId) => dispatch(fetchOrdersByUserId(userId)),
});

export default connect(mapState, mapDispatch)(UserOrders);
