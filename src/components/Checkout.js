import React, { useEffect, useState } from 'react';
import './Checkout.css'; // Import styles for the component

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Calculate total price
    const total = storedCart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalPrice(total);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be sent to the backend
    const paymentData = {
      shippingInfo,
      cartItems,
      totalPrice
    };

  
    try {

   // Call the backend payment API
   const response = await fetch('https://ecommerce-project-fu1p5g3xr-pranavs-projects-06b69d71.vercel.app/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
    mode: 'no-cors'
  });
  

      console.log('Payment Data:', paymentData);
      const text = await response.text(); // Get response as text
      console.log(text);
      
      if (response.ok) {
       
        // Redirect to payment success page
        window.location.href = '/payment-success';
      } else {
        console.error('Payment processing error:', text); // Log the text response
       
      }
      
    } 
    catch (error) {
      console.error("Payment processing error:", error);
      // In case of an error, redirect to the failure page
    
    }
  };
  
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="shipping-info">
          <h2>Shipping Information</h2>
          {/** Shipping info fields (same as before) */}
          <label>
            Name:
            <input type="text" name="name" value={shippingInfo.name} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} required />
          </label>
          <label>
            City:
            <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} required />
          </label>
          <label>
            State:
            <input type="text" name="state" value={shippingInfo.state} onChange={handleChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="zipCode" value={shippingInfo.zipCode} onChange={handleChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={shippingInfo.country} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={shippingInfo.email} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleChange} required />
          </label>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.productId} className="cart-item">
                  <img src={item.product.image} alt={item.product.title} />
                  <div>
                    <h3>{item.product.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
          <div className="total-price">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
