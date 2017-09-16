import React from 'react';
import { connect } from 'react-redux';
import { updateCartEntry } from '../store/reducers/cart';
import { deleteCartEntry } from '../store/reducers/cart';
import { NavLink } from 'react-router-dom';

function CartEntry({ product, quantity, updateCartEntry, deleteCartEntry }) {
  function handleQuantityChange(e) {
    e.preventDefault();
    updateCartEntry(product.id, e.target.value);
  }

  function handleRemove(e) {
    e.preventDefault();
    deleteCartEntry(product.id);
  }

  console.log('product is', product, 'and quantity is', quantity);
  const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <div>
      <span><NavLink to={`/product/${product.id}`}>{product.title}</NavLink></span>
      <span>{product.price}</span>
      <form style={{ display: 'inline-block' }}>
        <select value={quantity} onChange={handleQuantityChange}>
          { quantityArr.map(quantity => <option key={`option-${product.id}-${quantity}`} value={quantity}>{quantity}</option>)}
        </select>
      </form>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

const mapState = (state, ownProps) => ({});

const mapDispatch = dispatch => ({
  updateCartEntry: (productId, quantity) => dispatch(updateCartEntry(+productId, +quantity)),
  deleteCartEntry: productId => dispatch(deleteCartEntry(+productId)),
});

export default connect(mapState, mapDispatch)(CartEntry);
