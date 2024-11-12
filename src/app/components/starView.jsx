'use client'
import React from "react"
import { useState,useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";



const StarView=({product}) => {

    const router = useRouter();
    
     const [rating, setRating] = useState(0);
    // useEffect(()=>{
    //     setRating(productRating)
    // },[]);

    const handleClickStar =(product) => {

            const params = new URLSearchParams();
            params.set("id", product.id);
            params.set("name", product.name);
            params.set("price", product.price);
            params.set("image", product.image);
            
            
            router.push(`/single?${params.toString()}`);


    
        
        
        
    
    };
    
    const colors = {
        orange: "#F2C265",
        grey: "a9a9a9"
    }
    const stars = Array(5).fill(0)


    return (
        <div className="flex justify-center">
           {stars.map((_, index) => {
                return (
                     <FaStar
                         key={index}
                         size={24}
                         value={rating}
                         color={(rating) > index ? colors.orange : colors.grey}
                         onClick={() => handleClickStar(product)}
                      />
                 )
             })}
        </div>
      );


} 
export default StarView;