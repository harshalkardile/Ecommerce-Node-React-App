import React from "react";
import { baseurl } from "./baseURL";
const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    if (!name || !desc || !stock || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${baseurl}/add-product`, {
      method: "post",
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

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
