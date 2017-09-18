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

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { cart, createOrder } = this.props;
    createOrder(this.state.email, this.state.address, cart);
  }

  render() {
    const CartDiv = styled.div`
    margin: 5rem 10rem;
    min-width: 40rem;
  `;
   console.log('local state is', this.state);
    const { email, address, setEmail, setAddress, cart, createOrder } = this.props;
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
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              />
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>
                    <TextField value={this.state.email} id="email-input" hint="email" onChange={(e, value) => this.setState({ email: value })} />
                  </TableRowColumn>
                  <TableRowColumn />
                  <TableRowColumn />
                  <TableRowColumn>
                    <RaisedButton label="Check Out" onClick={this.handleSubmit} />
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <form onSubmit={this.handleSubmit} >
              <label htmlFor="email">Email:</label>
              <input name="email" type="text" onChange={e => setEmail(e.target.value)} />
              <label htmlFor="address">Address:</label>
              <input name="address" type="text" value={address} onChange={e => setAddress(e.target.value)} />
              <input type="submit" value="Confirm Purchase" />
            </form>
          </Box>
        </CartDiv>
      </MuiThemeProvider>
    );
  }
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



