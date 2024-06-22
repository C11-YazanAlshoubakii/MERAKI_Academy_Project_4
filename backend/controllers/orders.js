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

// Get Orders By User Id
const getOrdersByUser = (req, res) => {
  let userId = req.query.user;

  ordersModal
    .find({ userId: userId })
    .populate('serviceId')
    .then((orders) => {
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${userId} has no Orders`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the Orders for the author: ${userId}`,
        orders: orders,
      });
      console.log(orders);
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
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function update the Order Status by id
const updateOrdersStatusById = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  ordersModal
    .findByIdAndUpdate(
      id,
      {
        status,
      },
      { returnDocument: 'after' }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'Order Status updated',
        order: result,
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
// This function update the Order Completed by id
const updateOrdersCompletedById = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  ordersModal
    .findByIdAndUpdate(
      id,
      {
        completed,
      },
      { returnDocument: 'after' }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: 'Order completed updated',
        order: result,
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

module.exports = {
  createNewOrder,
  getOrdersByProvider,
  getOrdersByUser,
  updateOrdersStatusById,
  updateOrdersCompletedById,
};
