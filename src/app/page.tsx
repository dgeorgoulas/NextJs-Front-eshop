"use client";
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import axios from 'axios';
import { useState,useEffect } from 'react';
import
{UserContext}  from '@/context/AuthContext';
import { useContext } from 'react';




export default function Home() {
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const  {userData } = useContext(UserContext);
   




  useEffect(() => {
    const fetchProducts = async () => {
      try {

        console.log(userData);
        

        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data); 
        console.log(response.data)
      }
       catch (err) {
         setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);
  
  return (
    <div>
      <Header /> 
      <Products products={products} userData={userData}/>
      <Footer />
    </div>
    
  );
}
