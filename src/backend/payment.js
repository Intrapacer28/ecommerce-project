import Cors from 'cors';

// Initialize CORS
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

// Your main function
export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Run CORS middleware

  console.log('Incoming request method:', req.method); // Log incoming method

  if (req.method === 'POST') {
    console.log('Request Body:', req.body); // Log request body
    const { shippingInfo, cartItems, totalPrice } = req.body;

    // Simulate payment processing
    const paymentSuccessful = Math.random() > 0.5; 

    if (paymentSuccessful) {
      return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    console.log('Method not allowed:', req.method); // Log method not allowed
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
