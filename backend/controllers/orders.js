const ordersModal = require('../models/ordersSchema');

const createNewOrder = (req, res) => {
  const { serviceId, status, completed } = req.body;

  const userId = req.token.userId;

  const newOrder = new ordersModal({
    serviceId,
    userId,
    status: 'Pending',
    completed: false,
  });

  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `Order Created`,
        order: order,
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

module.exports = { createNewOrder };
