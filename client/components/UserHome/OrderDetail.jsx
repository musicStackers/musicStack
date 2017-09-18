import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrderProductByOrderId } from '../../store/reducers/order_product';

class OrderDetail extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { order, fetchOrderProductByOrderId } = this.props;
    fetchOrderProductByOrderId(order.id);
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        { products.map((product) => {
          const orderPrice = orderProducts.find(orderProduct => +orderProduct.productId === +product.id).price;
          return <div key={`thisProduct-${product.id}`}>{product.title} - ${orderPrice}</div>;
        })}
      </div>
    )
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
  fetchOrderProduct: (orderId) => dispatch(fetchOrderProductByOrderId(orderId)),
});

export default connect(mapState, mapDispatch)(OrderDetail);
