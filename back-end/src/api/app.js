const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const productsRoute = require('./routes/productsRoute');
const usersRoute = require('./routes/usersRoute');
const salesRoute = require('./routes/salesRoute');
const saleProductsRoute = require('./routes/saleProductsRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(registerRoute);
app.use(loginRoute);
app.use(productsRoute);
app.use(usersRoute);
app.use(salesRoute);
app.use(saleProductsRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
