const cors = require('cors');

const handler = (req, res) => {
  cors()(req, res, () => {
    if (req.method === 'POST') {
      console.log('Request Body:', req.body);
      const { shippingInfo, cartItems, totalPrice } = req.body;

      const paymentSuccessful = Math.random() > 0.5;

      if (paymentSuccessful) {
        return res.status(200).json({ success: true, message: 'Payment processed successfully!' });
      } else {
        return res.status(400).json({ success: false, message: 'Payment failed. Please try again.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
};

export default handler;