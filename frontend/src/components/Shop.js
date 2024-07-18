import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; 
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
   

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }

    const addToCart = (productId) => {
        console.log(`Adding ${productId} to cart.`);
        // Implement actual cart logic here
      };
    
      return (
        <div className="product-list">
          <h3>Product List</h3>
          <input type="text" className='search-product-box' placeholder='Search Product'onChange={searchHandle} /> 
          {
            products.length > 0 ? products.map((item) =>
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                desc={item.desc}
                stock={item.stock}
                price={item.price}
                category={item.category}
                addToCart={addToCart}
              />
            ) : <h1>No Results Found</h1>
          }
        </div>
      );
    }
    

export default ProductList;