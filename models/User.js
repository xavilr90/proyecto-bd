// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
