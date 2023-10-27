import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../../../utils/apiCalls';


const Product = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const numberOfProducts = 20;
  const displayedProducts = data.slice(0, numberOfProducts);



  const fetchProducts = async () => {
    const data = await getProducts();
    setData(data);

  };
  const parseImageLink = (imageLink) => {
    try {
      const imageArray = JSON.parse(imageLink);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        return imageArray[0];
      }
    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };


  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>

      {data.map((product, index) => (
        <div key={index} className="flex flex-col gap-2 cursor-pointer select ">
          {/* Wrap the product image and name with Link component */}
          <Link to={`/product/${product.ID}`}>
            <div className="rounded-[5px] h-[13rem] flex justify-center">
              <img
                className="rounded-[10px] h-full object-contain "
                src={apiDomain + "/image/" + parseImageLink(product.ImageLink)}
                alt={product.Name}
              />
            </div>


            <h3 className="font-bold hover:text-red-500 transition-all duration-300 px-16  flex items-center">
              <p className='text-[#5c5c59]'>{product.Name}</p>
            </h3>
          </Link>
          <div className="relative inline-block group font-bold px-16 ">
            <span className="inline-block transition-all duration-300 ">
              <p className='text-[#f42c37]'>{product.Price}.000 VNĐ</p>

            </span>
            <ToastContainer />
            <button
              className="left-full group-hover:translate-y-0 bg-red-500 text-white rounded-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={() => handleAddToCart(product.ID)} // Call handleAddToCart with the product ID when the button is clicked
            >
              Add to Cart
            </button>
          </div>

        </div>

      ))}
    </>
  );
};

export default Product;
