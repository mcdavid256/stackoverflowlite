const express = require('express');
const Joi = require('joi');

const router = express.Router();

// Set Route for Home Page
router.get('/', (req, res) => {
  res.send('Home Page');
});

module.exports = router;
