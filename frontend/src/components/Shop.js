import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useStateValue } from "../StateProvider";
import { baseurl } from "./baseURL";
import { Search } from "lucide-react"; // Make sure to install lucide-react
import "./Shop.css"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${baseurl}/products`);
    result = await result.json();
    setProducts(result);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${baseurl}/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Products</h3>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <Search className="search-icon" size={20} />
      </div>
      <div className="cards-container">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              desc={item.desc}
              stock={item.stock}
              price={item.price}
              category={item.category}
              image={item.image}
            />
          ))
        ) : (
          <h1>No Results Found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;
