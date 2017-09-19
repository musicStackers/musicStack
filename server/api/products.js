const Promise = require('bluebird');
const router = require('express').Router();
const { Product, Category, Review, Photo } = require('../db/models');

module.exports = router;

function adminGatekeeper(req, res, next) {
  if (!req.user) {
    return res.status(401).send('You are not logged in');
  }
  else if (!req.user.isAdmin) {
    return res.status(403).send('You are not authorized to perform this action');
  }
  next();
}

// GET for all Products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

// POST to create new Product
router.post('/', adminGatekeeper, (req, res, next) => {
  const { title, price, description, photoURL, category } = req.body;
  Product.create({ title, price, description })
    .then((newProduct) => {
      const photoPromise = Photo.create({ photoURL });
      return Promise.all([newProduct, photoPromise]);
    })
    .spread((newProduct, newPhoto) => {
      return Promise.all([newProduct.addPhoto(newPhoto), newPhoto]);
    })
    .spread((newProduct, newPhoto) => {
      return Promise.all([newProduct, newPhoto, Category.findById(category)]);
    })
    .spread((newProduct, newPhoto, cat) => {
      return Promise.all([newProduct, newPhoto, cat.addProduct(newProduct)]);
    })
    .spread((newProduct, newPhoto) => {
      res.status(201).json({ newProduct, newPhoto });
    })
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
router.get('/:productId', (req, res) => {
  res.status(200).json(req.product);
});

// PUT to edit Product
router.put('/:productId', adminGatekeeper, (req, res, next) => {
  req.product.update(req.body)
    .then(updatedProduct => res.status(200).json(updatedProduct))
    .catch(next);
});

// DELETE to delete a Product
router.delete('/:productId', (req, res, next) => {
  req.product.destroy()
    .then(() => res.sendStatus(200))
    .catch(next);
});

// POST to add Review to Product
router.post('/:productId/reviews', (req, res, next) => {
  Review.create({
    description: req.body.description,
    star: req.body.star,
    userId: req.user.id,
    productId: req.body.id,
  })
    .then(review => req.product.addReview(review))
    .then(() => res.sendStatus(200))
    .catch(next);
});

// POST to add Category to Product
router.post('/:productId/categories', adminGatekeeper, (req, res, next) => {
  Category.findById(req.body.id)
    .then(category => req.product.addCategory(category))
    .then(() => res.sendStatus(200))
    .catch(next);
});

// PUT to remove Category from Product
router.put('/:productId/categories', adminGatekeeper, (req, res, next) => {
  Category.findById(req.body.id)
    .then(category => req.product.removeCategory(category))
    .then(() => res.sendStatus(200))
    .catch(next);
});
