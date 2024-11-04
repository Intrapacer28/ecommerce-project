import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
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

// API route handler
const handler = async (req, res) => {
  await runMiddleware(req, res, cors);

  // Only handle POST requests
  if (req.method === 'POST') {
    const { shippingInfo, cartItems, totalPrice } = req.body;

    const paymentSuccessful = Math.random() > 0.5; // Simulate payment processing

    if (paymentSuccessful) {
      return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
