const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
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
  isAvailable: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Product;
