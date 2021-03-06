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
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { CartList } from './index';
import { setEmail } from '../store/reducers/checkout/email';
import { setAddress } from '../store/reducers/checkout/address';
import { createOrder } from '../store/reducers/checkout';
import { H2, Box } from './reusableStyles';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.user.address || '',
      email: this.props.user.email || '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { cart, createOrder } = this.props;
    createOrder(this.state.email, this.state.address, cart);
  }

  render() {
    const CartDiv = styled.div`
    margin: 5rem 10rem;
    min-width: 40rem;
  `;
    const { email, address, setEmail, setAddress, cart, createOrder } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <CartDiv>
            <Box>
              <H2>Checkout</H2>
            </Box>
            <Box>
              <CartList />
            </Box>
            <Box>
              <Table selectable={false}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                />
              </Table>
            </Box>
          </CartDiv>
        </MuiThemeProvider>
        <div style={{ marginLeft: '30rem', marginRight: '10rem' }}>
          <form className="mui-form" onSubmit={this.handleSubmit} >
            <div className="mui-textfield">
              <label htmlFor="email">Email (Required):</label>
              <input name="email" type="email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            </div>
            <div className="mui-textfield">
              <label htmlFor="address">Address (Required):</label>
              <input name="address" type="text" required value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
            </div>
            <button onClick={this.handleSubmit} className="mui-btn mui-btn--raised mui--pull-right">Confirm Purchase</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  email: state.checkout.email,
  address: state.checkout.address,
  cart: state.cart,
  user: state.user,
});

const mapDispatch = dispatch => ({
  setEmail: email => dispatch(setEmail(email)),
  setAddress: address => dispatch(setAddress(address)),
  createOrder: (email, address, cart) => dispatch(createOrder(email, address, cart)),
});

export default connect(mapState, mapDispatch)(Checkout);
