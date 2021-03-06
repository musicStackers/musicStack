import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderProductByOrderId } from '../../store/reducers/order_product';

class OrderDetail extends Component {
  componentDidMount() {
    const { order, fetchOrderProductByOrderId, orderProducts } = this.props;
    if (order) {
      fetchOrderProductByOrderId(order.id);
    }
  }

  render() {
    const { products, orderProducts } = this.props;
    return (
      <div>
        { products.map((product) => {
          const orderProduct = orderProducts.find(orderProduct => +orderProduct.productId === +product.id);
          const orderPrice = orderProduct.price;
          const orderQuantity = orderProduct.quantity;
          return <div key={`thisProduct-${product.id}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><div><b>Product:</b> {product.title}</div><div><b>Price:</b> ${orderPrice}</div><div><b>Quantity:</b> {orderQuantity}</div></div>;
        })}
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const orderProducts = state.orderProduct.filter(orderProduct => +orderProduct.orderId === +ownProps.order.id);
  const products = orderProducts.map(orderProduct => state.products.find(product => +product.id === +orderProduct.productId));
  return {
    products,
    orderProducts,
  };
};

const mapDispatch = dispatch => ({
  fetchOrderProductByOrderId: orderId => dispatch(fetchOrderProductByOrderId(orderId)),
});

export default connect(mapState, mapDispatch)(OrderDetail);
