import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { CartList } from './index';
import { H2, H3, Box, InnerBox } from './reusableStyles';
import history from '../history';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

function Cart() {
  const CartDiv = styled.div`
  margin: 5rem 10rem;
  min-width: 40rem;
`;

  return (
    <MuiThemeProvider>
      <CartDiv>
        <Box>
          <H2>Cart</H2>
        </Box>
        <Box>
          <CartList />
        </Box>
        <Box>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn />
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

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Cart);
