const express = require('express');
const { registerController } = require('../controllers/RegisterController');

const registerRoute = express.Router();

registerRoute.post('/register', (req, res) => registerController(req, res));

module.exports = registerRoute;