const mongoose = require('mongoose');

const services = new mongoose.Schema({
  serviceTitle: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  serviceCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, //Stretch Goal
  price: { type: Number },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estimatedTime: { type: Number },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  imageLink: { type: String },
});

module.exports = mongoose.model('Services', services);
