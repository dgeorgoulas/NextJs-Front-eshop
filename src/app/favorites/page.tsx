"use client";

import { useContext, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { UserContext } from '@/context/AuthContext';
import axios from 'axios';

export default function Cart() {
  const { userData } = useContext(UserContext);
  const [favProducts, setFavProducts] = useState([]);
  const url="http://localhost:8080";

  const fetchFavProducts = async () => {
    
    if (userData && userData.id) {
      try {
        setFavProducts([]); 
        
        const response = await axios.get(`http://localhost:8080/users/${userData.id}/favorites`, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        });
        
        const favorites = response.data;
        if (favorites) {
          setFavProducts(favorites.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            image: product.image,
            price: product.price,
            reviews: product.reviews,
            stock: product.stock
          })));
        }

        
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching fav orders", err);
      }
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      console.log("User is signed in:", userData);
      fetchFavProducts();
    } else {
      console.log("User is not signed in");
      
    }
  }, []); 

  return(
    <div>
   <Header/> 
   <h1 className="text-6xl font-bold mb-4 text-center">Your Favorites</h1>
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
    

      {favProducts.map((product) => {

        return (
          <div key={product.id} className="border p-4 rounded">
            <div className="relative w-full h-64">

              <img
                src={`${url}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                ></img>
                </div>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p>{product.price}</p>
                </div>
        )})}
           
 
                </div>
                <Footer/>
                </div>
  )
  
}