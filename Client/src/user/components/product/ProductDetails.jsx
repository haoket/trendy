import React, { useContext, useEffect, useState } from 'react';
import { apiDomain } from '../../../utils/utilsDomain';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../context/Context';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const { id } = useParams();
  const { setCartItems } = useContext(Context);

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
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${apiDomain}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, []);

  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAddToCart = async (product_id) => {
    try {
      await axios.post(`${apiDomain}/cart`, { product_id });
      getCartItems();
      toast.success(`${product.Name} has been added to the cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const renderStars = (stars) => {
    const filledStars = Math.min(stars, 5);
    const emptyStars = 5 - filledStars;
    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(<span key={`filled-${i}`}>&#9733;</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<span key={`empty-${i}`}>&#9734;</span>);
    }

    return <div>{starElements}</div>;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col gap-6'>
        <div>
          <div className='w-full sm:flex justify-center gap-[3rem] p-[2rem]'>
            <div className=' sm:w-[45%] rounded-lg'>
              <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} />
              <div>
                {/* {product.ImageLink.length > 0 && product.ImageLink.map((image, index) => (

                  <div key={index} className="m-1 relative" >
                    <img src={apiDomain + "/image/" + image} width={100} height={100} alt={`Ảnh ${index}`} />
                  </div>
                ))} */}

              </div>
            </div>
            <div className='sm:w-[55%] '>
              <h2 className='font-bold text-2xl mb-10'>{product.Name}</h2>
              <h1 className='tracking-wide font-bold mb-10'>Category: {product.Category}</h1>
              <div className='flex'>
                <h2 className='text-red-500 gap-6 mb-10'>{renderStars(product.Stars)}</h2>

                <h1>(1 customer review)</h1>

              </div>
              <div className='flex flex-row gap-20'>
                <div>
                  <p>Giá sản phẩm</p>
                  <p className='font-bold text-2xl mb-10'> {product.Price}.000 vnđ</p>
                </div>
                <div className='flex gap-6 mb-10'>
                  <div className='flex items-center'>
                    <button
                      onClick={() => setItemCount(itemCount - 1)}
                      disabled={itemCount <= 1}
                      className='border border-black rounded-md px-2 py-1 '
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'

                      >
                        <path
                          fillRule='evenodd'
                          d='M8.293 4.293a1 1 0 011.414 0L10 5.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                          clipRule='evenodd'

                        />
                      </svg>
                    </button>
                    <span className='mx-2'>{itemCount}</span>
                    <button
                      onClick={() => setItemCount(itemCount + 1)}
                      className='border border-black rounded-md px-3 py-1'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.ID)}
                    className='bg-red-500 text-white rounded-md px-4 py-2 mt-3'
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className='description-display'>

                <h1 className='font-bold text-2xl mb-5 '>Mô tả sản phẩm</h1>
                <ReactQuill
                  theme="snow"
                  value={product.Description}
                  readOnly={true}
                  modules={{ toolbar: null }}
                  className="quill-no-border"

                />
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
