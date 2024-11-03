import React from 'react';
import './PaymentSuccess.css'; // Add your styles

const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been processed successfully.</p>
      <button onClick={() => window.location.href = '/'}>Continue Shopping</button>
    </div>
  );
};

export default PaymentSuccess;
