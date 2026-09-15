const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['Agent', 'Landlord', 'Tenant', 'Hostel Admin', 'Caretaker'],
      required: true,
    },
    phone: { type: String, default: '' },
    assignedProperties: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);