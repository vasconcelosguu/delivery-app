const express = require('express');
const { loginController } = require('../controllers/LoginController');

const loginRoute = express.Router();

loginRoute.post('/login', (req, res) => loginController(req, res));

module.exports = loginRoute;