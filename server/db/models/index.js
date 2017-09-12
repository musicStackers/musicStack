const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Photo = require('./photo');
const Category = require('./category');
const Review = require('./review');
const OrderProduct = require('./order_product');
const CategoryProduct = require('./category_product');

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = {
  User,
  Product,
  Order,
  Photo,
  Category,
  Review,
  OrderProduct,
  CategoryProduct,
};
