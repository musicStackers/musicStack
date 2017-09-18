const router = require('express').Router();
const { Order, Product, OrderProduct } = require('../db/models');

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

function userGatekeeper(req, res, next) {
  if (!req.user) {
    res.status(401).send('You are not logged in');
  }
  next();
}

// GET for all Orders
router.get('/', adminGatekeeper, (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

// GET for all Orders specific to a User
router.get('/:userId', userGatekeeper, (req, res, next) => {
  if (+req.params.userId !== req.user.id) {
    res.status(403).send('You are not authorized to perform this action');
  }
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(orders => res.json(orders))
    .catch(next);
});

// PUT to edit a status of order
router.put('/:orderId', adminGatekeeper, (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next);
});

// POST to create a new order for a specifc user
router.post('/', (req, res, next) => {
  console.log('order received');
  const cart = req.body.cart;
  let userId;
  if (req.user) {
    userId = req.user.id;
  } else {
    userId = null;
  }
  Order.create({
    address: req.body.address,
    status: req.body.status,
    email: req.body.email,
    userId,
  })
    .then(newOrder => [Promise.all(req.body.cart.map(entry =>
      Product.findById(entry.productId)
    )), newOrder])
    .spread((products, newOrder) =>
      [Promise.all(products.map((product, index) =>
        OrderProduct.create({
          orderId: newOrder.id,
          productId: product.id,
          price: product.price,
          quantity: cart[index].quantity,
        })
      )), newOrder])
    .spread((orderproducts, newOrder) => {
      req.session.cart = [];
      return [orderproducts, newOrder];
    })
    .spread((orderproducts, newOrder) => res.status(201).send({ orderproducts, newOrder }))
    .catch(next);
});
