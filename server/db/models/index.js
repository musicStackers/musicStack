const User = require('./user');
const Product = require('./product');
const Order = require('./order');
<<<<<<< HEAD
const Photo = require('./photo');
const Category = require('./category');
const Review = require('./review');
const OrderProduct = require('./order_product');
const CategoryProduct = require('./category_product');
=======
const Review = require('./review');
const Category = require('./category');
const Photo = require('./photo'); // product photo
>>>>>>> 35-export-all-models

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

Photo.belongsTo(Product);
Product.hasMany(Photo);

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  User,
  Product,
  Order,
<<<<<<< HEAD
  Photo,
  Category,
  Review,
  OrderProduct,
  CategoryProduct,
=======
  Review,
  Category,
  Photo,
>>>>>>> 35-export-all-models
};
