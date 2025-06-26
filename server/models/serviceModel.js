const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true, collection: 'services' }); // Explicitly set collection name

module.exports = mongoose.model('Service', serviceSchema);
