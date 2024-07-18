import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    function updateProduct(productId) {
        navigate(`/update/${productId}`);
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
            <ul className='header'>
                <li>S. No.</li>
                <li>Name</li>
                <li>Description</li>
                <li>Stock</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li className='desc'>{item.desc}</li>
                        <li>{item.stock}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button className='button' onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button className='button' onClick={() => updateProduct(item._id)}>Update</button>
                        </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;