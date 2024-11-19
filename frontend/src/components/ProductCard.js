import React, { useState } from "react";
import "./ProductCard.css";
import "../App.css";
import { useStateValue } from "../StateProvider";

function ProductCard({ id, name, desc, stock, price, category, image }) {
  const [{ basket }, dispatch] = useStateValue();
  const [addedToCart, setAddedToCart] = useState(false);

  const addToBasket = () => {
    if (stock > 0) {
      // Always add a new item to the basket, even if it's the same product
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: `${id}_${Date.now()}`, // Generate a unique ID each time
          name: name,
          desc: desc,
          price: price,
          category: category,
          quantity: 1,
        },
      });
  
      setAddedToCart(true);
  
      // Revert the button state after 0.5 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 500);
    }
  };



  const dummyImage =
    "https://via.placeholder.com/300x300.png?text=Product+Image";

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image || dummyImage} alt={name} className="product-image" />
        <span className="product-category">{category}</span>
      </div>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{desc}</p>
        <div className="product-info">
          <span className="product-price">₹{price}</span>
          <span
            className={`product-stock ${stock > 0 ? "in-stock" : "out-of-stock"
              }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
      <button
        className={`add-to-cart-btn ${addedToCart ? "added" : ""} ${stock === 0 ? "unavailable" : ""
          }`}
        onClick={addToBasket}
        disabled={stock === 0}
      >
        {addedToCart ? "Added" : stock > 0 ? "Add to Cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default ProductCard;
