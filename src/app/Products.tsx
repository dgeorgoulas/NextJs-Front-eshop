import React from "react"
import { useState,useEffect } from 'react';
import { GoHeartFill,GoHeart } from "react-icons/go";
import { RiArrowRightFill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from "next/navigation";




const Products=({products,userData}) =>{
    const url="http://localhost:8080"
    const [likedProducts, setLikedProducts] = useState([]);
    const [likedCartProducts, setLikedCartProducts] = useState([]);
    
   const [hoveredProduct, setHoveredProduct] = useState(null)
   const [hoveredImage, setHoveredImage] = useState(null)
   const [currentIndex, setCurrentIndex] = useState(0);
   const [cart, setCart] = useState([]);
   const [cartProducts, setCartProducts] = useState([]);
   const [isClicking, setClicking] = useState(null);
   const[order,setOrder]=useState(null);
   const[mpampesiko,setMpampesiko]=useState(600);
   const router = useRouter();
   
   
   
  const itemsToShow = 4;

  const maxIndex = products.length - itemsToShow; 

   const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < products.length - 1 ? prevIndex + 1 : prevIndex));
  };
  useEffect(() => {
    const fetchCartOrders = async () => {
     try {
      if (userData && userData.id) {
        setCartProducts([]);

        
        const response = await axios.get(`http://localhost:8080/orders/user/${userData.id}`
        , {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        });
        const cartOrder=response.data[0];
        setOrder(response.data[0]);
        console.log(cartOrder);

        cartOrder.product.map((product) =>
          setCartProducts((prev) =>
               [...prev, product.id] 

          )

        )
        
      }

    } catch (err) {
      console.log("error");
    }
  }
    fetchCartOrders();
  }, [cart]);


  useEffect(() => {
    const fetchCartFavorites = async () => {
     try {
      
      if (userData && userData.id) {
        setLikedCartProducts([]);

        
        const response = await axios.get(`http://localhost:8080/users/${userData.id}/favorites` , {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        });
        const favorites=response.data;
        console.log(favorites);
        
        favorites.map((product) =>
          setLikedCartProducts((prev) =>
               [...prev, product.id]

          )

        )

       
      }

    } catch (err) {
      console.log("error");

    }
  }
    fetchCartFavorites();
  }, [likedProducts]);
  

    
  const handleHeartClick =async (product) => {
   
    if (!userData || !userData?.id ) {
      router.push("/login");
     }

     if(likedCartProducts.length>0 && likedCartProducts.includes(product.id)){
       
         
         const responsDel = await axios.delete(`http://localhost:8080/users/${userData.id}/favorites/${product.id}`
          , {
            headers: {
              Authorization: `Bearer ${userData.accessToken}`,
            },
          });
         console.log(responsDel);
         setMpampesiko(mpampesiko+1);
         setLikedProducts(mpampesiko);

         
           
       }
       else{
         console.log(product);
         const responseSav=await  axios({
           method: 'post',
           url: `http://localhost:8080/users/${userData.id}/favorites/${product.id}`,
           data: product,
           headers: {
            Authorization: `Bearer ${userData.accessToken}`, 
          }
           
         });
         console.log(responseSav);
         setLikedProducts(product.id);

         
       }
     
     
   }
    





    const isInCart = (productId) =>{
       
          return cartProducts.includes(productId);
        }
    

  
  
    const handleCartToggle = async(productId) => {


     
      if ( userData.id==null) {
       router.push("/");
      }

      if(cartProducts.length>0){
        if(cartProducts.includes(productId)){
          
          const responsDel = await axios.delete(`http://localhost:8080/orders/${order.id}/products/${productId}`
          , {
            headers: {
              Authorization: `Bearer ${userData.accessToken}`, 
            },
          });
          console.log(responsDel);
          setCart(productId);
          
            
        }
        else{
          const responseSav=await  axios({
            method: 'post',
            url: `http://localhost:8080/orders/${order.id}/products/${productId}`,
            data: order
             ,headers: {
            Authorization: `Bearer ${userData.accessToken}`, 
          }
            
          });
          console.log(responseSav);
          setCart(productId);

          
        }
      }
      else{
        
        const responseSav=await  axios({
          method: 'post',
        
          url: `http://localhost:8080/orders/${order.id}/products/${productId}`,
          data: 
             order
          
        });
        console.log(responseSav);
        setCart(productId);
        
      }
    }
      

    const handleButtonClick = (e,productId) => {
    
    handleCartToggle(productId); 
    setTimeout(() => {
      setClicking(null);
    }, 100);
  };

    return(
        <>
      <div className="flex justify-center">
        <p className="text-center tracking-tighter font-bold text-gray-200 text-12xl w-4/5 my-96">SHOP ALL</p>
      </div>

      <div className="flex space-x-6 mx-8">
      <button className="border-4 border-navy-900 bg-navy-700 text-white py-3 px-6 rounded-full shadow-lg hover:bg-white hover:text-navy-700 transition-all duration-300">
        NEW ARRIVALS
      </button>

      
      <button className="rounded-full border-4 border-olive-700 bg-olive-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-white hover:text-olive-500 transition-all duration-300">
        WHAT'S TRENDING
      </button>
    </div>

    

<div className="mt-8"></div>


<div className="mx-8">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.slice(8, 16).map((product) => {
        const isLiked = likedCartProducts.includes(product.id);
        const isHovered = hoveredProduct === product.id;
        const isHoveredImage=hoveredImage===product.id;
        const isClickable=isClicking===product.id;

        return (
          <div key={product.id} className="border p-4 rounded">
            <div className="relative w-full h-64">

              <img
                src={`${url}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onMouseEnter={() => {setHoveredImage(product.id)
                  setClicking(product.id)
                }
                  
                }
                onMouseLeave={() => setHoveredImage(null)} 
              />
              <span
                className={`absolute top-2 right-2 z-10 rounded-full p-1 cursor-pointer transition-colors duration-200`}
                onClick={() => handleHeartClick(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)} 
              >
                {isHovered || isLiked ? (
                  <GoHeartFill className="text-red-500" />
                ) : (
                  <GoHeart className="text-black" />
                )}
              </span>
               {(isHoveredImage || isClickable) &&
               (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                      <span
                        className={`py-2 px-4 rounded-full text-white ${
                          isInCart(product.id)
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={(e) => {
                           e.preventDefault();

                          handleButtonClick(e,product.id);}
                        }
                      >
                        {isInCart(product.id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </span>
                    </div>
               )}
                  
            </div>
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>



<div className="mt-32"></div>


<div className="grid grid-cols-2 gap-4">
  <div className="relative">
    <img 
      src="/images/rec1.png"
      alt="rec1"
      className="w-full h-auto object-cover rounded-lg"
    />
               <div className="relative bottom-32 left-20 ">
                <a 
          href="/shop" 
          className="inline-block px-6 py-3 bg-transparent border border-white text-white   font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          SHOP NOW
        </a>

               </div>

  </div>

  <div className="relative mt-20">
    <img 
      src="/images/rec2.png"
      alt="Image 2"
      className="w-full h-auto object-cover rounded-lg"
    />
                  <div className="relative bottom-32 left-20 ">
                <a 
          href="/shop" 
          className="inline-block px-6 py-3 bg-transparent border border-white text-white   font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          SHOP NOW
        </a>

               </div>
</div>
</div>


  
    <div className="w-full h-auto mb-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
       
         <div className="flex justify-center items-center h-screen">
          <h1 className="text-6xl font-bold">
          <span className="text-outline-black text-white outline-width-8">BEST</span>{' '}
          <span className="text-white">SELLING</span>
           </h1>
        </div>

       
        <div className="grid grid-cols-6 ">
         
          <div className="col-span-5 flex justify-end">
          <button
            
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </button>
          </div>
         


          
          <div className="col-span-1 flex justify-start">
          <button
            onClick={nextSlide}
          >
            <FaArrowRight />
          </button>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-4 gap-4">
    {products.slice(currentIndex + 14, currentIndex + 14 + itemsToShow).map((product) => {
      

      const isLiked = likedCartProducts.includes(product.id);
      const isHovered = hoveredProduct === product.id;

      return (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg relative">
          <div className="relative w-full h-48">
            <img
              src={`${url}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <span
              className={`absolute top-2 right-2 z-10 rounded-full p-1 cursor-pointer transition-colors duration-200`}
              onClick={() => handleHeartClick(product)}
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {isHovered || isLiked ? (
                <GoHeartFill className="text-red-500" />
              ) : (
                <GoHeart className="text-black" />
              )}
            </span>
          </div>
          <h3 className="text-lg font-semibold mt-2 text-center">{product.name}</h3>
          <p className="text-center">{product.price}</p>
        </div>
      );
    })}
  </div>
    
    </div>
</div>

     </>

);
 };

 export default Products;
