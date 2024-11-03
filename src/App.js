// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import Navbar from './components/Navbar';
import Homepage from './components/HomePage';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess'; // Import PaymentSuccess
import PaymentFailure from './components/PaymentFailure'; // Import PaymentFailure

const App = () => {
    return (
        <CartProvider> {/* Wrap the entire app in CartProvider */}
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} /> {/* Route for PaymentSuccess */}
                    <Route path="/payment-failure" element={<PaymentFailure />} /> {/* Route for PaymentFailure */}
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
