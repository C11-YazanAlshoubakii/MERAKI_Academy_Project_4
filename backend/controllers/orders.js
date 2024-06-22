const ordersModal = require('../models/ordersSchema');

// Create Order
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

// Get Orders By Provider Id
const getOrdersByProvider = (req, res) => {
  let providerId = req.query.provider;

  ordersModal
    .find()
    .populate({
      path: 'serviceId',
      populate: [
        {
          path: 'serviceProvider',
          populate: [
            {
              path: 'userName',
            },
          ],
        },
      ],
    })

    .then((orders) => {
      if (!orders.length) {
        console.log(orders);
        return res.status(404).json({
          success: false,
          message: `The author: ${providerId} has no Orders`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the Orders for the author: ${providerId}`,
        orders: orders,
      });
      // console.log(orders[0].serviceId.serviceProvider.userName);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { createNewOrder, getOrdersByProvider };
