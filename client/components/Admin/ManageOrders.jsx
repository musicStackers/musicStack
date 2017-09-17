import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropDownMenu, MenuItem } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Styles
const styles = {
};

/**
 * COMPONENT
 */
class ManageOrders extends Component {

  constructor(props) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleStatusChange(evt) {
    evt.preventDefault();
  }

  render() {
    const { orders } = this.props;

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
              <TableHeaderColumn>Order Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              orders.map((order) => {
                return (
                  <TableRow key={order.id}>
                    <TableRowColumn>
                      {order.id}
                    </TableRowColumn>
                    <TableRowColumn>
                      {order.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      {order.address}
                    </TableRowColumn>
                    <TableRowColumn>
                      <DropDownMenu
                        onChange={this.handleStatusChange}
                        value={order.status}
                      >
                        <MenuItem value="created" primaryText="Created" />
                        <MenuItem value="processing" primaryText="Processing" />
                        <MenuItem value="cancelled" primaryText="Cancelled" />
                        <MenuItem value="completed" primaryText="Completed" />
                      </DropDownMenu>
                    </TableRowColumn>
                  </TableRow>
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

const mapDispatch = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    // addCampus: (campus) => {
    //   dispatch(addCampusThunk(campus, history));
  }
};

export default connect(mapState, mapDispatch)(ManageOrders);
