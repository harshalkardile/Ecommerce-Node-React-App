import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "./baseURL";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(`${baseurl}/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setName(result.name);
      setDesc(result.desc);
      setStock(result.stock);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(`${baseurl}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, desc, stock, price, category, company }),
        headers: {
          "Content-Type": "Application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        toast.success("Product updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <h3 className="form-title">Update Product</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter product name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter product description"
            className="form-input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter product stock"
            className="form-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter product price"
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter product category"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter product company"
            className="form-input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button
          onClick={updateProduct}
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </div>
      {isLoading && (
        <div className="loader-container">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      )}
      <ToastContainer />
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default UpdateProduct;
