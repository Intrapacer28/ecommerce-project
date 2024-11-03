import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemIndex = cart.findIndex(item => item.productId === product.id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity; // Update quantity if item already in cart
    } else {
      cart.push({ productId: product.id, quantity, product });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="images">
        <img src={product.image} alt={product.title} className="main-image" />
        <div className="thumbnails">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="info">
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="rating">
          <span>Rating: {product.rating.rate} ⭐</span>
          <span> ({product.rating.count} reviews)</span>
        </div>
        <p className="description">{product.description}</p>
        <div className="purchase-options">
          <input
            type="number"
            value={quantity}
            min="1"
            max="99"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <p>Free shipping on orders over $50.</p>
        </div>
        <div className="return-policy">
          <h3>Return Policy</h3>
          <p>30-day return policy on all products.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
