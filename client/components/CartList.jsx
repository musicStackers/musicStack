import React from 'react';
import { connect } from 'react-redux';
import { CartEntry } from './index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


function CartList({ entries }) {

  const totalPrice = entries.reduce((acc, entry) => {
    return acc + (entry.product.price * entry.quantity);
  }, 0);

  return (
    <MuiThemeProvider>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableHeaderColumn>
            Product Title
          </TableHeaderColumn>
          <TableHeaderColumn>
            Unit Price
          </TableHeaderColumn>
          <TableHeaderColumn>
            Quantity
          </TableHeaderColumn>
          <TableHeaderColumn>
            Remove
          </TableHeaderColumn>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            entries.map(entry => <CartEntry key={`product-${entry.product.id}`} {...entry} />)
          }
          <TableRow />
          <TableRow>
            <TableRowColumn />
            <TableRowColumn />
            <TableRowColumn >
              <b>Total:</b>
            </TableRowColumn>
            <TableRowColumn>
              $ {totalPrice}
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </MuiThemeProvider>
  );
}

const mapState = (state, ownProps) => {
  const cart = state.cart;
  const entries = cart.map(entry => ({ product: state.products.find(product => +product.id === +entry.productId), quantity: entry.quantity }));
  return {
    entries,
  };
};

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(CartList);
