const router = require('express').Router();
const { Product, Category, Review } = require('../db/models');

module.exports = router;

// GET for all Products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [Category],
  })
    .then(users => res.json(users))
    .catch(next);
});

// POST to create new Product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(next);
});

// PARAM for Product ID
router.param('productId', (req, res, next, id) => {
  Product.findById(id)
    .then((product) => {
      req.product = product;
      next();
      return null;
    })
    .catch(next);
});

// GET for specific Product
router.get('/:productId', (req, res, next) => {
  res.status(200).json(req.product)
    .catch(next);
});

// PUT to edit Product
router.put('/:productId', (req, res, next) => {
  req.product.update(req.body)
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(next);
});

// DELETE to delete a Product
router.delete('/:productId', (req, res, next) => {
  req.product.destroy()
    .then(res.sendStatus(200))
    .catch(next);
});

// POST to add Review to Product
router.post('/:productId/reviews', (req, res, next) => {
  Review.create(req.body)
    .then(review => req.product.addReview(review))
    .then(res.sendStatus(200))
    .catch(next);
});

// POST to add Category to Product
router.post('/:productId/categories', (req, res, next) => {
  Category.findById(req.body.id)
    .then(category => req.product.addCategory(category))
    .then(res.sendStatus(200))
    .catch(next);
});

// PUT to remove Category from Product
router.put('/:productId/categories', (req, res, next) => {
  Category.findById(req.body.id)
    .then(category => req.product.removeCategory(category))
    .then(res.sendStatus(200))
    .catch(next);
});
