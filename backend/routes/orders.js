const express = require('express');

// Import services controllers
const {
  createNewOrder,
  getOrdersByProvider,
  getOrdersByUser,
  updateOrdersStatusById,
  updateOrdersCompletedById,
  deleteAllOrdersById,
} = require('../controllers/orders');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const ordersRouter = express.Router();

ordersRouter.get('/orders', authentication, getOrdersByProvider);
ordersRouter.get('/orders_user', authentication, getOrdersByUser);
ordersRouter.put('/:id', updateOrdersStatusById);
ordersRouter.put('/:id/completed', updateOrdersCompletedById);
ordersRouter.delete('/:id', deleteAllOrdersById);

ordersRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewOrder
);

module.exports = ordersRouter;
