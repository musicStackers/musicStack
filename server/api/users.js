const router = require('express').Router();
const { User, Order } = require('../db/models');

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

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'isAdmin'],
  })
    .then(users => res.json(users))
    .catch(next);
});

// DELETE a user by userId
router.delete('/:userId', adminGatekeeper, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:userId', userGatekeeper, (req, res, next) => {
  if (+req.user.id !== +req.params.userId) {
    res.status(403).send('You are not authorized to perform this action');
  }
  User.findById(req.params.userId)
    .then(user => user.update({
      email: req.body.email,
      address: req.body.address,
    }))
    .then((user) => {
      if(req.body.password) {
        return user.update({
          password: req.body.password
        })
      }
      else return user
    })
    .then(user => res.json(user))
    .catch(console.error);
});

// PUT to change any user's info (admin only)
router.put('/:userId/byAdmin', adminGatekeeper, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next);
});

// PUT promote a user to admin status
router.put('/:userId/toAdmin', adminGatekeeper, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update({ isAdmin: true }))
    .then(user => res.json({ id: user.id, email: user.email, isAdmin: user.isAdmin }))
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
router.put('/:userId/reset', adminGatekeeper, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update({ mustResetPassword: true }))
    .catch(next);
});

