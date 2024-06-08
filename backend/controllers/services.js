const serviceModel = require('../models/serviceSchema');

// This function returns the articles
const getAllServices = (req, res) => {
  const userId = req.token.userId;
  serviceModel
    .find()
    // .populate('comments')
    .exec()
    .then((services) => {
      if (services.length) {
        res.status(200).json({
          success: true,
          message: `All the services`,
          userId: userId,
          services: services,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Articles Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function creates new service
const createNewService = (req, res) => {
  const {
    serviceTitle,
    serviceDescription,
    serviceCategory,
    price,
    estimatedTime,
  } = req.body;

  const serviceProvider = req.token.userId;

  const newService = new serviceModel({
    serviceTitle,
    serviceDescription,
    serviceCategory,
    price,
    serviceProvider,
    estimatedTime,
    comments: [],
  });

  newService
    .save()
    .then((service) => {
      res.status(201).json({
        success: true,
        message: `Service Created`,
        service: service,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createNewService,
  getAllServices,
};
