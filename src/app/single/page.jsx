'use client'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../Footer';
import Header from '../Header';
import Star from '../components/star';
import '../styles/singlePost.css';



const ProductDetails = () => {
    const [rating, setRating] = useState(0);
    const url="http://localhost:8080";
    const [isProductPage,setIsProductPage]=useState(false);

    const handleRatingSelect = (selectedRating) => {
        setRating(selectedRating);
        console.log("Selected Rating:", selectedRating);
    };

  
    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const image = searchParams.get('image');
    const handlePost=() => {
        console.log(rating);

    }
  

  return (

     
    <div className="grid min-h-screen place-items-center">
    <Header />

    <div className="grid grid-cols-2 gap-8 p-8 bg-white shadow-xl rounded-lg max-w-4xl mt-8 mb-8 mx-8 " >

        <div className='p-8'>
            <h1 className="text-5xl font-extrabold text-gray-800">{name}</h1>
            <p className="text-2xl text-gray-500 font-semibold">${price}</p>
            <p className="text-lg text-gray-600 leading-relaxed">
                This is a fantastic product that offers great features and excellent quality. Perfect for anyone looking to add style and comfort to their wardrobe.
            </p>
            <Star onProductSelect={handleRatingSelect}/>

            <button onClick={handlePost}>Publish</button>
            
            </div>

        {/* Right Column: Product Image without Flex */}
        <div >
            <img
                src={`${url}${image}`}
                alt={name}
                className="image"
            />
        </div>``
    </div>

    <Footer />
</div>

  );
};

export default ProductDetails;
