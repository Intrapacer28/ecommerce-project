const express = require('express');
const cors = require('cors');

const router = express.Router();

// Use CORS
router.use(cors());

// POST payment route
router.post('/payment', (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { shippingInfo, cartItems, totalPrice } = req.body;

  const paymentSuccessful = Math.random() > 0.5; // Simulate payment processing

  if (paymentSuccessful) {
    return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
  } else {
    return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
