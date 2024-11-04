const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./backend/payment'); // Adjust path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use('/api/payment', paymentRoutes); // Mount the payment route under /api

// Default route
app.get('/', (req, res) => {
  res.send('API is running'); // Optional: Just to check if the server is running
});

// Export the app for Vercel
module.exports = app;
