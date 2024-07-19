import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setDesc(result.desc);
        setStock(result.stock);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, desc, stock, price, category, company }),
            headers: {
                'Content-Type': 'Application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div class="product-form-container">
        <div class="product-form">
          <h3 class="form-title">Update Product</h3>
          <div class="form-group">
            <input type="text" placeholder="Enter product name" class="form-input"
              value={name} onChange={(e) => { setName(e.target.value) }}
            />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Enter product description" class="form-input"
              value={desc} onChange={(e) => { setDesc(e.target.value) }}
            />
          </div>
          <div class="form-group">
            <input type="number" placeholder="Enter product stock" class="form-input"
              value={stock} onChange={(e) => { setStock(e.target.value) }}
            />
          </div>
          <div class="form-group">
            <input type="number" placeholder="Enter product price" class="form-input"
              value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Enter product category" class="form-input"
              value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Enter product company" class="form-input"
              value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
          </div>
          <button onClick={updateProduct} class="submit-button">Update Product</button>
        </div>
      </div>
    )
}

export default UpdateProduct;