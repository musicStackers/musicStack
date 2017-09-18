import React from 'react';
import { connect } from 'react-redux';

function OrderDetail({ products, orderProducts }) {
  console.log('order are', products);
  return (
    <div>
      { products.map((product) => {
        const orderPrice = orderProducts.find(orderProduct => +orderProduct.productId === +product.id).price;
        return <div key={`thisProduct-${product.id}`}>{product.title} - ${orderPrice}</div>;
      })}
    </div>
  );
}

const mapState = (state, ownProps) => {
  const orderProducts = state.orderProduct.filter(orderProduct => +orderProduct.orderId === +ownProps.order.id);
  const products = orderProducts.map(orderProduct => state.products.find(product => +product.id === +orderProduct.productId));
  return {
    products,
    orderProducts,
  };
};

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(OrderDetail);
