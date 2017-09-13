const router = require('express').Router();
const { CategoryProduct } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  CategoryProduct.findAll()
    .then(categoryProduct => res.json(categoryProduct))
    .catch(next);
});
