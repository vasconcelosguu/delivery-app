const express = require('express');
const { getSaleProductsController,
createSaleProductsController } = require('../controllers/SaleProductsController');

const saleProductsRoute = express.Router();

saleProductsRoute.post('/saleproducts', (req, res) => getSaleProductsController(req, res));
saleProductsRoute.post('/products/sales', (req, res) => createSaleProductsController(req, res));
module.exports = saleProductsRoute;