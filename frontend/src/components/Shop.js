import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; 
import { useStateValue } from '../StateProvider';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [state, dispatch] = useStateValue();
   

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
    

      return (
        <div className="product-list">
          <h3>Products</h3>
          <input type="text" className='search-product-box' placeholder='Search Product'onChange={searchHandle} /> 
          <div className="cards-container">
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
                
              />
            ) : <h1>No Results Found</h1>
          }
          </div>
        </div>
      );
    }
    

export default ProductList;