const mongoose = require('mongoose');

const orders = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String }, //pending , accepted , declined
  completed: { type: Boolean },
});

module.exports = mongoose.model('Orders', orders);
