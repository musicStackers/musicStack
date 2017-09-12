const db = require('../db');

const CategoryProduct = db.define('category_product', {
}, {
  tableName: 'category_product',
});

module.exports = CategoryProduct;

