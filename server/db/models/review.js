const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    notNull: true,
    validate: {
      notEmpty: true,
      len: {
        args: [5, 1000],
        msg: 'Please provide a review in more than 5 characters or fewer than 1000 characters.',
      },
    },
  },
  star: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5,
    },
  },
});

module.exports = Review;

