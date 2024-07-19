import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  function updateProduct(productId) {
    navigate(`/update/${productId}`);
  }

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list-container">
      <h3 className="product-list-title">Product List</h3>
      <input
        type="text"
        className="product-search-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul className="product-list-header">
        <li className="header-item">S. No.</li>
        <li className="header-item">Name</li>
        <li className="header-item">Description</li>
        <li className="header-item">Stock</li>
        <li className="header-item">Price</li>
        <li className="header-item">Category</li>
        <li className="header-item">Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul className="product-list-item" key={item._id}>
            <li className="item-data">{index + 1}</li>
            <li className="item-data">{item.name}</li>
            <li className="item-data item-desc">{item.desc}</li>
            <li className="item-data">{item.stock}</li>
            <li className="item-data">{item.price}</li>
            <li className="item-data">{item.category}</li>
            <li className="item-actions">
              <button
                className="action-button delete-button"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>
              <button
                className="action-button delete-button"
                onClick={() => updateProduct(item._id)}
              >
                Update
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1 className="no-results">No Results Found</h1>
      )}
    </div>
  );
};

export default ProductList;
