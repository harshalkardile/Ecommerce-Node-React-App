import React from 'react';
import './ProductCard.css';
import '../App.css' // Import the CSS file

function ProductCard({ id, name, desc, stock, price, category, addToCart }) {
  return (
    <div className="card">
    
        <h3 className="product-name">{name}</h3>
        <p className="product-desc">{desc}</p>
        <p className="product-stock">Stock: {stock}</p>
        <p className="product-price">${price}</p>
        <p className="product-category">Category: {category}</p>
      
      <button className="add-to-cart-btn" onClick={() => addToCart(id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;