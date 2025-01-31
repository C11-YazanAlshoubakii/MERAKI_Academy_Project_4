const serviceModel = require('../models/serviceSchema');

// This function returns the services
const getAllServices = (req, res) => {
  const userId = req.token.userId;
  serviceModel
    .find()
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'commenter',
        },
      ],
    })
    .populate('serviceProvider')
    .exec()
    .then((services) => {
      if (services.length) {
        res.status(200).json({
          success: true,
          message: `All the articles`,
          userId: userId,
          services: services,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No services Yet`,
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

//This function returns services by provider
const getServicesByProvider = (req, res) => {
  let providerId = req.query.provider;

  serviceModel
    .find({ serviceProvider: providerId })
    .then((services) => {
      if (!services.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${providerId} has no Services`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the Services for the author: ${providerId}`,
        services: services,
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

// This function creates new service
const createNewService = (req, res) => {
  const {
    serviceTitle,
    serviceDescription,
    serviceCategory,
    price,
    estimatedTime,
    imageLink,
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
    imageLink,
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

// This function update the service by id
const updateServiceById = (req, res) => {
  const { id } = req.params;
  const {
    serviceTitle,
    serviceDescription,
    serviceCategory,
    price,
    estimatedTime,
    imageLink,
  } = req.body;

  serviceModel
    .findByIdAndUpdate(
      id,
      {
        serviceTitle,
        serviceDescription,
        serviceCategory,
        price,
        estimatedTime,
        imageLink,
      },
      { returnDocument: 'after' }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'service updated',
        service: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        err: err.message,
      });
    });
};

// This function delete the service by id
const deleteServiceById = (req, res) => {
  const { id } = req.params;
  serviceModel
    .findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'Service deleted ',
      });
    })
    .catch((err) => {
      res.json(500).json({
        success: false,
        message: 'Server Error',
        err: err.message,
      });
    });
};

module.exports = {
  createNewService,
  getAllServices,
  getServicesByProvider,
  updateServiceById,
  deleteServiceById,
};
