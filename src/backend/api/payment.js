const express = require('express');
const router = express.Router();

// Middleware to handle CORS
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-project-plum-nine.vercel.app'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle preflight request
router.options('/', (req, res) => {
  res.sendStatus(204);
});

router.post('/', (req, res) => {
  const { shippingInfo, cartItems, totalPrice } = req.body;

  // Simulate payment processing logic
  const paymentSuccessful = Math.random() > 0.5; // 50% chance of success

  if (paymentSuccessful) {
    return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
  } else {
    return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
