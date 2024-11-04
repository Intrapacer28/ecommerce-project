const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./api/payment'); // Adjust path as necessary

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

// Use CORS with specific origin
const corsOptions = {
  origin: 'https://ecommerce-project-44a5sxf4v-pranavs-projects-06b69d71.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST'], // Include all HTTP methods you need
};

app.use(cors(corsOptions));


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // For parsing application/json
app.use('/api/payment', paymentRoutes); // Mount the payment route under /api/payment

// Default route
app.get('/', (req, res) => {
  console.log(req);
  res.send('API is running'); // Optional: Just to check if the server is running
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;
