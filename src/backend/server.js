const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Simulate a payment processing endpoint
app.post('/api/payment', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    const { shippingInfo, cartItems, totalPrice } = req.body;
  
    const paymentSuccessful = Math.random() > 0.5; // 50% chance of success
  
    if (paymentSuccessful) {
      return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
