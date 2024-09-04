import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { baseurl } from "./baseURL";
import { Search } from "lucide-react"; // Make sure to install lucide-react
import ClipLoader from "react-spinners/ClipLoader";
import "./Shop.css";

const ProductList = () => {
  const [products, setProducts] = useState(null); // Initialize with null to distinguish between loading and empty state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true); // Show loader
    let result = await fetch(`${baseurl}/products`);
    result = await result.json();
    setProducts(result);
    setIsLoading(false); // Hide loader after fetching
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    setIsLoading(true); // Show loader during search
    if (key) {
      let result = await fetch(`${baseurl}/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
    setIsLoading(false); // Hide loader after search
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
      {isLoading ? (
        <div className="loader-container">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      ) : (
        <div className="cards-container">
          {products && products.length > 0
            ? products.map((item) => (
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
            : products !== null && <h1>Login to View Products</h1>}
        </div>
      )}
    </div>
  );
};

export default ProductList;
