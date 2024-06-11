//server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const app = express();

mongoose.connect('your_mongoDB_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.post('/api/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
