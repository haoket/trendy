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
  const [totalPrice, setTotalPrice] = useState();
  const [price, setPrice] = useState();






  // lấy hình ảnh đầu tiên của mảng 
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
        setTotalPrice(response.data.Price);
        setPrice(response.data.Price);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [])

  const handleIncrement = async () => {
    setItemCount(itemCount + 1);
    setTotalPrice(price * (itemCount + 1));
  }
  const handleDeCrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);

      setTotalPrice(price * (itemCount - 1));

    }
  }


  // Function to get the cart items using Axios
  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };





  // handle add to cart
  const handleAddToCart = async () => {
    const data = {
      product_id: id,
      quantity: itemCount,
      price: totalPrice,
    }
    try {
      await axios.post(`${apiDomain}/cart`, data);
      getCartItems();
      toast.success(` Sản phẩm ${product.Name} đã được thêm vào giỏ hàng thành công!`, {
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
  //hiển thị đánh giá sao sản phẩm
  const renderStars = (stars) => {
    const filledStars = Math.min(stars, 5);
    const emptyStars = 5 - filledStars;
    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(<span key={`filled-${i}`}> <i className='bx bxs-star'></i></span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<span key={`empty-${i}`}> <i className='bx bx-star'></i></span>);
    }

    return <div>{starElements}</div>;
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-main">
        <div className="container">
          <div className="box">
            <div className="breadcumb">
              <Link to="/">home</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <Link to="/products">products</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <a href="#">{product.Name}</a>
            </div>
          </div>
          <div className="row product-row">
            <div className="col-5 col-md-4">
              <div className="product-img" id="product-img">
                <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
              </div>
              <div className="box">
                <div className="product-img-list">
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                  </div>
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                  </div>
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7 col-md-8">
              <div className="product-info">
                <h1>
                  {product.Name}
                </h1>
                <div className="product-info-detail">
                  <span className="product-info-detail-title">Brand:</span>
                  {product.Category}
                </div>
                <div className="product-info-detail">
                  <span className="product-info-detail-title">Rated:</span>
                  <span className="rating">
                    <h2 className='text-red-500 gap-6 mb-10'>{renderStars(product.Stars)}</h2>
                  </span>
                </div>
                <p className="product-description">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo libero alias officiis dolore doloremque eveniet culpa dignissimos, itaque, cum animi excepturi sed veritatis asperiores soluta, nisi atque quae illum. Ipsum.
                </p>
                <div className="product-info-price">{totalPrice}.000 VNĐ</div>
                <div className="product-quantity-wrapper">
                  <span className="product-quantity-btn" onClick={handleDeCrease}
                    disabled={itemCount <= 1}>
                    <i className='bx bx-minus'></i>
                  </span>
                  <span className="product-quantity">{itemCount}</span>
                  <span className="product-quantity-btn" onClick={handleIncrement}>
                    <i className='bx bx-plus'></i>
                  </span>
                </div>
                <div>
                  <button className="btn-flat btn-hover" onClick={() => handleAddToCart(product.ID)}>add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              description
            </div>
            <div className="product-detail-description">
              <ReactQuill
                theme="snow"
                value={product.Description}
                readOnly={true}
                modules={{ toolbar: null }}
                className="quill-no-border border-none"

              />
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              review
            </div>
            <div>
              <div className="user-rate">
                <div className="user-info">
                  <div className="user-avt">
                    <img src="./images/tuat.jpg" alt="" />
                  </div>
                  <div className="user-name">
                    <span className="name">tuat tran anh</span>
                    <span className="rating">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                    </span>
                  </div>
                </div>
                <div className="user-rate-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                </div>
              </div>
              <div className="user-rate">
                <div className="user-info">
                  <div className="user-avt">
                    <img src="./images/tuat.jpg" alt="" />
                  </div>
                  <div className="user-name">
                    <span className="name">tuat tran anh</span>
                    <span className="rating">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                    </span>
                  </div>
                </div>
                <div className="user-rate-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                </div>
              </div>
              <div className="user-rate">
                <div className="user-info">
                  <div className="user-avt">
                    <img src="./images/tuat.jpg" alt="" />
                  </div>
                  <div className="user-name">
                    <span className="name">tuat tran anh</span>
                    <span className="rating">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                    </span>
                  </div>
                </div>
                <div className="user-rate-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                </div>
              </div>
              <div className="user-rate">
                <div className="user-info">
                  <div className="user-avt">
                    <img src="./images/tuat.jpg" alt="" />
                  </div>
                  <div className="user-name">
                    <span className="name">tuat tran anh</span>
                    <span className="rating">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                    </span>
                  </div>
                </div>
                <div className="user-rate-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                </div>
              </div>
              <div className="user-rate">
                <div className="user-info">
                  <div className="user-avt">
                    <img src="./images/tuat.jpg" alt="" />
                  </div>
                  <div className="user-name">
                    <span className="name">tuat tran anh</span>
                    <span className="rating">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                    </span>
                  </div>
                </div>
                <div className="user-rate-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea iste, veritatis nobis amet illum, cum alias magni dolores odio, eius quo excepturi veniam ipsa voluptatibus natus voluptas vero? Aspernatur!
                </div>
              </div>
              <div className="box">
                <ul className="pagination">
                  <li><a href="#"><i className='bx bxs-chevron-left'></i></a></li>
                  <li><a href="#" className="active">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#"><i className='bx bxs-chevron-right'></i></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              related products
            </div>
            <div className="row" id="related-products"></div>
          </div>
        </div>
      </div>
      {/* <!-- end product-detail content --> */}









      {/* <div className='flex flex-col gap-6'>
        <div>
          <div className='w-full sm:flex justify-center gap-[3rem] p-[2rem]'>
            <div className=' sm:w-[45%] rounded-lg'>
              <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} />
              <div>

                ////////////////////////
                 {product.ImageLink.length > 0 && product.ImageLink.map((image, index) => (

                  <div key={index} className="m-1 relative" >
                    <img src={apiDomain + "/image/" + image} width={100} height={100} alt={`Ảnh ${index}`} />
                  </div>
                ))} 

                ////////////////

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
                  <p className='font-bold text-2xl mb-10'> {totalPrice}.000 vnđ</p>
                </div>
                <div className='flex gap-6 mb-10'>
                  <div className='flex items-center'>
                    <button
                      onClick={handleDeCrease}
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
                      onClick={handleIncrement}
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
      </div> */}
    </>
  );
};

export default ProductDetails;
