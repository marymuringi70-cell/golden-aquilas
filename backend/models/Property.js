const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  period: { type: String, default: 'per month' },
  imageUrl: { type: String, default: '' },
  amenities: [{ type: String }],
  status: { type: String, enum: ['AVAILABLE', 'BOOKED'], default: 'AVAILABLE' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);