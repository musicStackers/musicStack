const router = require('express').Router();
const { Photo } = require('../db/models');

module.exports = router;

// GET for all Product Photos
router.get('/', (req, res, next) => {
  Photo.findAll()
    .then(photos => res.json(photos))
    .catch(next);
});
