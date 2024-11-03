import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Homepage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the FakeStore API
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Our E-Commerce Store</h1>
                <p>Your one-stop shop for the latest trends!</p>
            </header>
            <section className="hero">
                <h2>Discover Our Exclusive Deals</h2>
                <button className="shop-now">Shop Now</button>
            </section>

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-list">
                    {products.map(product => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="product-item"
                        >
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p className="price">${product.price}</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
