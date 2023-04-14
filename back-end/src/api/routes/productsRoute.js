const express = require('express');
const {
  productsAllController,
  productsIdController,
} = require('../controllers/ProductsController');

const productsRoute = express.Router();

productsRoute.get('/products', (req, res) => productsAllController(req, res));
productsRoute.get('/products/:id', (req, res) =>
  productsIdController(req, res));

module.exports = productsRoute;
