import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "./baseURL";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    if (!name || !desc || !stock || !price || !company || !category) {
      setError(true);
      return false;
    }

    setIsLoading(true);
    setError(false);

    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch(`${baseurl}/add-product`, {
        method: "POST",
        body: JSON.stringify({
          name,
          desc,
          stock,
          price,
          category,
          company,
          userId,
        }),
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.warn(result);

      if (result) {
        toast.success("Product added successfully");
        navigate("/"); // Redirect to product list or dashboard
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h1 className="form-title">Add Product</h1>
      <form className="product-form" onSubmit={addProduct}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && !name && (
          <span className="error-message">Enter valid name</span>
        )}

        <input
          className="form-input"
          type="text"
          placeholder="Enter Product Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        {error && !desc && (
          <span className="error-message">Enter valid description</span>
        )}

        <input
          className="form-input"
          type="number"
          placeholder="Enter Product Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        {error && !stock && (
          <span className="error-message">Enter valid stock</span>
        )}

        <input
          className="form-input"
          type="number"
          placeholder="Enter Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {error && !price && (
          <span className="error-message">Enter valid price</span>
        )}

        <input
          className="form-input"
          type="text"
          placeholder="Enter Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {error && !category && (
          <span className="error-message">Enter valid category</span>
        )}

        <input
          className="form-input"
          type="text"
          placeholder="Enter Product Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        {error && !company && (
          <span className="error-message">Enter valid company</span>
        )}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
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

export default AddProduct;
