const express = require('express');

// Import articles controllers
const { createNewService, getAllServices } = require('../controllers/services');

// Middleware
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// Create articles router
const servicesRouter = express.Router();
servicesRouter.get('/', authentication, getAllServices);
servicesRouter.post(
  '/',
  authentication,
  authorization('CREATE_SERVICE'),
  createNewService
);

module.exports = servicesRouter;
