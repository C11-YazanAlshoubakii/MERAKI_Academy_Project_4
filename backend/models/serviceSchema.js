const mongoose = require('mongoose');

const services = new mongoose.Schema({
  serviceTitle: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  serviceCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  phone: { type: Number },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estimatedTime: { type: Number },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Services', services);
