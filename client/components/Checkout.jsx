import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { CartList } from './index';
import { setEmail } from '../store/reducers/checkout/email';
import { setAddress } from '../store/reducers/checkout/address';
import { createOrder } from '../store/reducers/checkout';
import { H2, H3, Box, InnerBox } from './reusableStyles';

function Checkout({ email, address, setEmail, setAddress, cart, createOrder }) {

  function handleSubmit(e) {
    e.preventDefault();
    createOrder(e.target.email.value, e.target.address.value, cart);
  }

  const CartDiv = styled.div`
  margin: 5rem 10rem;
  min-width: 40rem;
`;

  return (
    <MuiThemeProvider>
      <CartDiv>
        <Box>
          <H2>Checkout</H2>
        </Box>
        <Box>
          <CartList />
        </Box>
        <Box>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>
                  <TextField hintText="email" value={email} onChange={(e, value) => setEmail(value)} />
                </TableRowColumn>
                <TableRowColumn />
                <TableRowColumn />
                <TableRowColumn>
                  <RaisedButton label="Check Out" onClick={() => history.push('/cart/checkout')} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </CartDiv>
    </MuiThemeProvider>
  );
}

const mapState = (state, ownProps) => ({
  email: state.checkout.email,
  address: state.checkout.address,
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  setEmail: email => dispatch(setEmail(email)),
  setAddress: address => dispatch(setAddress(address)),
  createOrder: (email, address, cart) => dispatch(createOrder(email, address, cart)),
});

export default connect(mapState, mapDispatch)(Checkout);


// <form onSubmit={handleSubmit} >
// <label htmlFor="email">Email:</label>
// <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
// <label htmlFor="address">Address:</label>
// <input name="address" type="text" value={address} onChange={e => setAddress(e.target.value)} />
// <input type="submit" value="Confirm Purchase" />
// </form>
