const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['BNB', 'HOSTEL'], required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  specs: [{ type: String }],
  status: { type: String, enum: ['AVAILABLE', 'BOOKED'], default: 'AVAILABLE' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);