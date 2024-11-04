const mongoose = require('mongoose');
const Glucosa = require('../models/Glucosa');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  diabetes: { type: Boolean, required: true },
  glucosa: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;