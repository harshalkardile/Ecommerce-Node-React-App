import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "./baseURL";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(`${baseurl}/products`);
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setIsLoading(true);
      try {
        let result = await fetch(`${baseurl}/product/${id}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          method: "DELETE",
        });
        result = await result.json();
        if (result) {
          toast.success("Product deleted successfully");
          getProducts();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateProduct = (productId) => {
    navigate(`/update/${productId}`);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    setIsLoading(true);
    try {
      if (key) {
        let result = await fetch(`${baseurl}/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
      toast.error("Failed to search products");
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <div className="loader-container">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      ) : products.length > 0 ? (
        products.map((item, index) => (
          <ul className="product-list-item" key={item._id}>
            <li className="item-data">{index + 1}</li>
            <li className="item-data">{item.name}</li>
            <li className="item-data item-desc">{item.desc}</li>
            <li className="item-data">{item.stock} (Qty)</li>
            <li className="item-data">₹{item.price}</li>
            <li className="item-data">{item.category}</li>
            <li className="item-actions">
              <button
                className="action-icon delete-icon"
                onClick={() => deleteProduct(item._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="action-icon update-icon"
                onClick={() => updateProduct(item._id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1 className="no-results">No Results Found</h1>
      )}
      <ToastContainer className="custom-toast-container" />
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .custom-toast-container .Toastify__toast {
          min-height: 30px;
          font-size: 0.8rem;
        }

        .action-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          margin-right: 8px;
          color: #007bff;
        }

        .action-icon.delete-icon {
          color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
