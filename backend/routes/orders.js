const express = require('express');

// Import services controllers
const {
  createNewOrder,
  getOrdersByProvider,
  getOrdersByUser,
  updateOrdersStatusById,
  updateOrdersCompletedById,
  deleteAllOrdersById,
  deleteOrderById,
} = require('../controllers/orders');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const ordersRouter = express.Router();

ordersRouter.get('/orders', authentication, getOrdersByProvider);
ordersRouter.get('/orders_user', authentication, getOrdersByUser);

ordersRouter.put('/:id', updateOrdersStatusById);
ordersRouter.put('/completed/:id', updateOrdersCompletedById);

ordersRouter.delete('/:id', deleteAllOrdersById);
ordersRouter.delete('/order/:id', deleteOrderById);

ordersRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewOrder
);

module.exports = ordersRouter;
