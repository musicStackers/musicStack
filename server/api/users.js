const router = require('express').Router();
const { User, Order } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

// function adminGatekeeper (req, res, next) {
//   if (!req.user) {
//     res.status(401).send('You are not logged in');
//   }
//   if (!req.user.isAdmin) {
//     res.status(403).send('You are not authorized to perform this action');
//   }
// }

// DELETE a user by userId
router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.destroy())
    .catch(next);
});

// PUT promote a user to admin status
router.put(':/userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update({ isAdmin: true }))
    .catch(next);
});

// GET return a list of user's previous orders
router.get('/:userId/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
  })
    .then(orders => res.json(orders))
    .catch(next);
});

// GET return details of a past order
router.get('/order/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

// GET return the contents of a user's cart
// note: this returns [{ productId, quantity }, ...]
router.get('/cart', (req, res) => {
  if (!req.cart) {
    res.status(404).send('Cart could not be found');
  }
  res.json(req.cart);
});

// PUT trigger password reset
router.put('/:userId/reset', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update({ mustResetPassword: true }))
    .catch(next);
});
