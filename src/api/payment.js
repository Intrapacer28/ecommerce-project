const Cors = require('cors');

// Initialize CORS
const cors = Cors({
  methods: ['POST'],
});

// Helper method to wait for middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Main handler function for Vercel
const handler = async (req, res) => {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Check for POST method
  if (req.method === 'POST') {
    const { shippingInfo, cartItems, totalPrice } = req.body;
    const paymentSuccessful = Math.random() > 0.5;

    if (paymentSuccessful) {
      return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = handler;
