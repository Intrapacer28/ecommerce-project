// backend/api/payment.js
const express = require('express');
const cors = require('cors');
const router = express.Router();

router.post('/api/payment', (req, res) => {
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
