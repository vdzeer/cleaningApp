const { Schema, model } = require('mongoose');

const DryCleaning = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  services: { type: Array, required: true },
  photo: { type: String, required: true },
});

module.exports = model('DryCleaning', DryCleaning);
