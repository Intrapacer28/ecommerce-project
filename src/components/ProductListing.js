import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ProductListing.css'; // Import styles for the component

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 100], rating: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Fetch mock product data from an API (this URL is just a placeholder)
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products'); // Replace with your mock API
      setProducts(response.data);
      setFilteredProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const { category, priceRange, rating } = filters;
    const newFilteredProducts = products.filter((product) => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const inCategory = category ? product.category === category : true;
      const inRating = rating ? product.rating.rate >= rating : true; // Use product.rating.rate
      return inPriceRange && inCategory && inRating;
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-listing">
      <header className="header">
        <h1>Mock eCommerce</h1>
        <input type="text" placeholder="Search..." />
        <div className="cart-icon">🛒</div>
      </header>
      <div className="content">
        <aside className="filters">
          <h2>Filters</h2>
          <div>
            <h3>Category</h3>
            <select name="category" onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          <div>
            <h3>Price Range</h3>
            <input
              type="range"
              name="priceRange"
              min="0"
              max="100"
              onChange={handleFilterChange}
            />
            <span>{filters.priceRange[0]} - {filters.priceRange[1]}</span>
          </div>
          <div>
            <h3>Rating</h3>
            <select name="rating" onChange={handleFilterChange}>
              <option value="0">All</option>
              <option value="4">4 Stars & Above</option>
              <option value="3">3 Stars & Above</option>
              <option value="2">2 Stars & Above</option>
              <option value="1">1 Star & Above</option>
            </select>
          </div>
          <button onClick={applyFilters}>Apply Filters</button>
        </aside>
        <main className="product-grid">
          {currentProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>Rating: {product.rating.rate}</p>
              <button>Add to Cart</button>
            </Link>
          ))}
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
