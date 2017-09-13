const router = require('express').Router();
const { Category } = require('../db/models');

module.exports = router;

// GET for all Categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

// POST to create new Category
router.post('/', (req, res, next) => {
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
router.put('/:categoryId', (req, res, next) => {
  req.category.update(req.body)
    .then(updatedCategory => res.status(200).json(updatedCategory))
    .catch(next);
});

// DELETE to delete a Category
router.delete('/:categoryId', (req, res, next) => {
  req.category.destroy()
    .then(() => res.sendStatus(200))
    .catch(next);
});
