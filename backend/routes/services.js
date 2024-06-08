const express = require('express');

// Import articles controllers
const {
  createNewService,
  getAllServices,
  getServicesByProvider,
  updateServiceById,
} = require('../controllers/services');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const servicesRouter = express.Router();

servicesRouter.get('/', authentication, getAllServices);
servicesRouter.get('/search_1', getServicesByProvider);

servicesRouter.put('/:id', updateServiceById);

servicesRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewService
);

module.exports = servicesRouter;
