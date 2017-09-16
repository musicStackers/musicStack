const router = require('express').Router();
const { Order, Product, OrderProduct } = require('../db/models');

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
router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
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
