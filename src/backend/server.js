const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./api/payment'); // Adjust path as necessary

const app = express();
app.options('*', cors(corsOptions)); // For handling preflight requests

const PORT = process.env.PORT || 5000;

// Use CORS with specific origin
const corsOptions = {
  origin: [
    'https://ecommerce-project-44a5sxf4v-pranavs-projects-06b69d71.vercel.app', 
    'https://ecommerce-project-knjn3xfkk-pranavs-projects-06b69d71.vercel.app', 
    'https://ecommerce-project-fu1p5g3xr-pranavs-projects-06b69d71.vercel.app' // Add all necessary URLs here
  ],
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));


app.use(cors(corsOptions)); // Apply CORS with specific options

// Middleware
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
