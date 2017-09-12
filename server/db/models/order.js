const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('Order', {
  status: {
    type: Sequelize.ENUM,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
