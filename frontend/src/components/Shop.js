import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ClipLoader } from "react-spinners";
import { baseurl } from "./baseURL";
import { Search } from "lucide-react";
import "./Shop.css";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(`${baseurl}/products`);
      result = await result.json();
      setProducts(result);
      const uniqueCategories = [...new Set(result.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchQuery(key);
    setIsLoading(true);

    try {
      if (key) {
        let result = await fetch(`${baseurl}/search/${key}`);
        result = await result.json();
        if (result) {
          const filteredResults = selectedCategory === "all"
            ? result
            : result.filter(item => item.category === selectedCategory);
          setProducts(filteredResults);
        }
      } else {
        let allProducts = await fetch(`${baseurl}/products`);
        allProducts = await allProducts.json();
        const filteredProducts = selectedCategory === "all"
          ? allProducts
          : allProducts.filter(item => item.category === selectedCategory);
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
    setIsLoading(false);
  };

  const handleCategoryChange = async (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setIsLoading(true);

    try {
      if (searchQuery) {
        let searchResults = await fetch(`${baseurl}/search/${searchQuery}`);
        searchResults = await searchResults.json();
        const filteredResults = value === "all"
          ? searchResults
          : searchResults.filter(item => item.category === value);
        setProducts(filteredResults);
      } else {
        let allProducts = await fetch(`${baseurl}/products`);
        allProducts = await allProducts.json();
        const filteredProducts = value === "all"
          ? allProducts
          : allProducts.filter(item => item.category === value);
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error filtering by category:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="product-list">
      <h3>
        Products
        <span>Your one-stop shop for everything!</span> {/* Optional subtext */}
      </h3>

      <div className="search-filter-container">
        <div className="search-container">
          <div className="search-box-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              onChange={searchHandle}
            />
            <Search className="search-icon" size={20} />
          </div>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loader-overlay">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      ) : (
        <div className="cards-container">
          {products && products.length > 0 ? (
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
            products !== null && (
              <div className="no-products">
                <h1>No Product Found!</h1>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;