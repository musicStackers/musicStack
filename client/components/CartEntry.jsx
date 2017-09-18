import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { DropDownMenu, MenuItem, IconButton } from 'material-ui';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import { updateCartEntry, deleteCartEntry } from '../store/reducers/cart';

function CartEntry({ product, quantity, updateCartEntry, deleteCartEntry }) {

  function handleRemove(e) {
    e.preventDefault();
    deleteCartEntry(product.id);
  }

  const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <TableRow>
      <TableRowColumn><NavLink to={`/product/${product.id}`}>{product.title}</NavLink></TableRowColumn>
      <TableRowColumn>$ {product.price}</TableRowColumn>
      <TableRowColumn>
        <DropDownMenu value={quantity} onChange={(event, index, value) => updateCartEntry(product.id, value)} underlineStyle={{ display: 'none' }}>
          { quantityArr.map(quantity => <MenuItem key={`option-${product.id}-${quantity}`} value={quantity} primaryText={quantity} />)}
        </DropDownMenu>
      </TableRowColumn>
      <TableRowColumn>
        <IconButton>
          <RemoveIcon onClick={handleRemove} />
        </IconButton>
      </TableRowColumn>
    </TableRow>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({
  updateCartEntry: (productId, quantity) => dispatch(updateCartEntry(+productId, +quantity)),
  deleteCartEntry: productId => dispatch(deleteCartEntry(+productId)),
});

export default connect(mapState, mapDispatch)(CartEntry);
