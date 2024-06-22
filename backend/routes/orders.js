const express = require('express');

// Import services controllers
const {
  createNewOrder,
  getOrdersByProvider,
} = require('../controllers/orders');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const ordersRouter = express.Router();

ordersRouter.get('/orders', authentication, getOrdersByProvider);

ordersRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewOrder
);

module.exports = ordersRouter;
