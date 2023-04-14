import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import ShoppingCart from '../Components/ShoppingCart';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const getProducts = await axios.get('http://localhost:3001/products');
      setProducts(getProducts.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Products">
      <Navbar />
      {isLoading ? (
        'carrengado'
      ) : (
        <div className="Products__container">
          {products.map((product) => (
            <Card card={ product } key={ product.item } />
          ))}
          <ShoppingCart />
        </div>
      )}
    </div>
  );
}

export default Products;
