const router = require('express').Router();

module.exports = router;

router.use('/cart', require('./cart'));
router.use('/categories', require('./categories'));
router.use('/category_product', require('./category_product'));
router.use('/order_product', require('./order_product'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/photos', require('./photos'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
