const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

// GET for all Orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

// GET for all Orders specific to a User
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(orders => res.json(orders))
    .catch(next);
});

// PUT to edit a status of order
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .catch(next);
});

// POST to create a new order for a specifc user 
router.post('/:userId', (req, res, next) => {
  Order.create({
    address: req.body.address,
    status: req.body.status,
    email: req.body.email,
    userId: req.params.userId,
  })
    .then(newOrder => res.status(201).send(newOrder))
    .catch(next);
});
