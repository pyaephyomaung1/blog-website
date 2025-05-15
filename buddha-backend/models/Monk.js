const mongoose = require('mongoose');

const monkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String }
});

module.exports = mongoose.model('Monk', monkSchema);