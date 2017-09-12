const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      // converts from price in cents to price in dollars
      return this.getDataValue('price') / 100;
    },
    set(priceWithDecimal) {
      // converts from price in dollars to price in cents
      this.setDataValue('price', priceWithDecimal * 100);
    },
  },
}, {
  tableName: 'order_product',
});

module.exports = OrderProduct;
