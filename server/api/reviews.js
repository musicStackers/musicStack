const router = require('express').Router();
const { Review } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.user) {
    res.status(401).send('You must be logged in to submit a review.');
  }
  Review.create({
    description: req.body.description,
    star: req.body.star,
    productId: req.body.productId,
    userId: req.user.id,
  })
    .then(review => res.json(review))
    .catch(next);
});
