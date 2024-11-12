'use client'
import React from "react"
import { useState,useEffect } from 'react';
import { FaStar } from "react-icons/fa";



const Star=({onProductSelect}) => {
    const [rating, setRating] = useState(0)
    const [hoverValue, setHoverValue] = useState(0)
    const handleClickStar = value => {
        setRating(value)
        onProductSelect(value)
    
        
        
        
    
    };
    console.log(rating);
    const handleMouseOverStar = value => {
        setHoverValue(value)
    };
    
    const handleMouseLeaveStar = () => {
        setHoverValue(0)
    }
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
                         onChange={(e) => setRating(e.target.value)}
                         color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                         onClick={() => handleClickStar(index + 1)}
                         onMouseOver={() => handleMouseOverStar(index + 1)}
                         onMouseLeave={() => handleMouseLeaveStar}
                      />
                 )
             })}
        </div>
      );


} 
export default Star;