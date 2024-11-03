import React from 'react';
import './PaymentFailure.css'; // Add your styles

const PaymentFailure = () => {
  return (
    <div className="payment-failure">
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment could not be processed. Please try again.</p>
      <button onClick={() => window.location.href = '/checkout'}>Try Again</button>
      <button onClick={() => window.location.href = '/'}>Go to Homepage</button>
    </div>
  );
};

export default PaymentFailure;
