const express = require('express');

// Import services controllers
const {
  createNewService,
  getAllServices,
  getServicesByProvider,
  updateServiceById,
  deleteServiceById,
} = require('../controllers/services');

const { createNewComment } = require('./../controllers/comments');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const servicesRouter = express.Router();

servicesRouter.get('/', authentication, getAllServices);
servicesRouter.get('/search_1', authentication, getServicesByProvider);

servicesRouter.put('/:id', updateServiceById);

servicesRouter.delete('/:id', deleteServiceById);

servicesRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewService
);

// Comments Routers
servicesRouter.post(
  '/:id/comments',
  authentication,
  authorization('CREATE_COMMENTS'),
  createNewComment
);

module.exports = servicesRouter;
