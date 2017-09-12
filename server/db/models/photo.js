const Sequelize = require('sequelize');
const db = require('../db');

const Photo = db.define('photo', {
  photoURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Photo;
