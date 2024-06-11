// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { login, password, email, telefono } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ login, password: hashedPassword, email, telefono });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
