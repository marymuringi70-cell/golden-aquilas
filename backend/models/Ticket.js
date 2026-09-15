const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  property: { type: String, required: true },
  unit: { type: String, required: true },
  guest: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, default: null },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);