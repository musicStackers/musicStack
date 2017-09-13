const router = require('express').Router();
const { OrderProduct } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  OrderProduct.findAll()
    .then(orderProduct => res.json(orderProduct))
    .catch(next);
});
