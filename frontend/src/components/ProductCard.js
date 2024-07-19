import React from "react";
import "./ProductCard.css";
import "../App.css";
import { useStateValue } from "../StateProvider";

function ProductCard({ id, name, desc, stock, price, category }) {
  const [{ basket }, dispatch] = useStateValue();

  console.log("this is the bascke>>>>>", basket);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        name: name,
        desc: desc,
        price: price,
        category: category,
      },
    });
  };
  return (
    <div className="card">
      <h3 className="product-name">{name}</h3>
      <p className="product-desc">{desc}</p>
      <p className="product-price">₹{price}</p>
      <p className="product-category">Category: {category}</p>
      <button className="add-to-cart-btn" onClick={() => addToBasket(id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
