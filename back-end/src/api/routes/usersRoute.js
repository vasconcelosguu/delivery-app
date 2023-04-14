const express = require('express');
const { 
    usersController, userGet, userGetId, allUsersController, registerAdminController, 
} = require('../controllers/UsersController');

const usersRoute = express.Router();
usersRoute.post('/usersId', (req, res) => userGetId(req, res));
usersRoute.post('/users', (req, res) => userGet(req, res));
usersRoute.get('/users/sellers', (req, res) => usersController(req, res));
usersRoute.get('/users', (req, res) => allUsersController(req, res));
usersRoute.post('/register/admin', (req, res) => registerAdminController(req, res));

module.exports = usersRoute;