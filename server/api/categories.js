const router = require('express').Router();
const { Category } = require('../db/models');

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

// GET for all Categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

// POST to create new Category
router.post('/', adminGatekeeper, (req, res, next) => {
  Category.create(req.body)
    .then(newCategory => res.status(201).json(newCategory))
    .catch(next);
});

// PARAM for Category ID
router.param('categoryId', (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      req.category = category;
      next();
      return null;
    })
    .catch(next);
});

// GET for specific Category
router.get('/:categoryId', (req, res) => {
  res.status(200).json(req.category);
});

// PUT to edit Category
router.put('/:categoryId', adminGatekeeper, (req, res, next) => {
  req.category.update(req.body)
    .then(updatedCategory => res.status(200).json(updatedCategory))
    .catch(next);
});

// DELETE to delete a Category
router.delete('/:categoryId', adminGatekeeper, (req, res, next) => {
  req.category.destroy()
    .then(() => res.sendStatus(200))
    .catch(next);
});
