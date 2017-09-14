const router = require('express').Router();

module.exports = router;

// GET to retrieve the current session's cart
router.get('/', (req, res) => {
  if (!req.cart) {
    res.json([]);
  } else {
    res.json(req.cart);
  }
});

// POST to add an item to the cart,
// or add new quantity to existing quantity if product already is in cart
router.post('/', (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  if (!req.cart) {
    req.cart = [];
  }
  // Cart is an array of objects with format { productId, quantity }
  // Increase quantity of product entry if found, otherwise push a new cart entry
  const cartEntry = req.cart.find(entry => +entry.productId === +productId);
  if (cartEntry) {
    cartEntry.quantity += quantity;
    res.json(cartEntry);
  } else {
    const newCartEntry = { productId, quantity };
    req.cart.push(newCartEntry);
    res.json(newCartEntry);
  }
});

// PUT to edit the quantity of items in an existing cart entry
router.put('/', (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  if (!req.cart) {
    res.status(404).send('Cart could not be retrieved or does not exist');
  }
  // Cart is an array of objects with format { productId, quantity }
  // Replace existing quantity with new user-specified quantity
  const cartEntry = req.cart.find(entry => +entry.productId === +productId);
  if (!cartEntry) {
    res.status(404).send('Product does not exist in cart');
  } else {
    cartEntry.quantity = quantity;
    res.json(cartEntry);
  }
});

// DELETE to remove a product from cart (regardless of quantity)
router.delete('/', (req, res) => {
  const productId = req.body.productId;
  if (!req.cart) {
    res.status(404).send('Cart already does not exist');
  }
  // Cart is an array of objects with format { productId, quantity }
  // Find index of desired cart entry, then assign req.cart to a new array without product entry
  const productEntryIndex = req.cart.findIndex(entry => +entry.productId === +productId);
  if (!productEntryIndex) {
    res.status(404).send('Product already has been removed from the cart');
  } else {
    req.cart = req.cart.slice(0, productEntryIndex).concat(req.cart.slice(productEntryIndex + 1));
    res.status(200).send('Successfully removed from cart');
  }
});

