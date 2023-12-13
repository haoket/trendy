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
  const [listImg, setListImg] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const [comment, setComment] = useState('');
  const { user } = useContext(Context);
  const [showFullDescription, setShowFullDescription] = useState(false);



  const truncateDescription = (description) => {
    const maxLength = 1000; // Độ dài tối đa của mô tả ngắn gọn
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  // lấy data comment
  const fetchComment = async () => {
    try {
      const response = await axios.get(`${apiDomain}/comment-product/${id}`);
      setDataComment(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  // bình luận 
  const handleComment = async () => {
    const commentData = {
      id_product: id,
      id_user: user.id,
      content: comment,
      date_create: new Date(),
      reply: '',
    };

    try {
      await axios.post(`${apiDomain}/comment-product`, { commentData });
      fetchComment();
      toast.success('Comment successfully', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Cập nhật giá trị của comment thành chuỗi rỗng
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  const parseImageLink = (imageLink) => {
    try {
      const imageArray = JSON.parse(imageLink);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        return imageArray;
      }
    } catch (error) {
      console.error('Error parsing ImageLink:', error);
    }
    return null;
  };



  // lấy hình ảnh đầu tiên của mảng 


  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${apiDomain}/products/${id}`);
      setProduct(response.data);
      setTotalPrice(response.data.Price);
      setPrice(response.data.Price);
      setListImg(parseImageLink(response.data.ImageLink));
    } catch (error) {
      console.error('Error fetching product details:', error);
    }

  };

  useEffect(() => {


    fetchProductDetails();
    fetchComment();

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
                <img src={apiDomain + "/image/" + listImg[0]} alt="" />
              </div>
              <div className="box">
                <div className="product-img-list">
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + listImg[1]} alt="" />
                  </div>
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + listImg[2]} alt="" />
                  </div>
                  <div className="product-img-item">
                    <img src={apiDomain + "/image/" + listImg[3]} alt="" />
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
                  <span className="product-info-detail-title">Loại sản phẩm:</span>
                  {product.Category}
                </div>
                <div className="product-info-detail">
                  <span className="product-info-detail-title">Đánh giá:</span>
                  <span className="rating">
                    <h2 className='text-red-500 gap-6 mb-10'>{renderStars(product.Stars)}</h2>
                  </span>
                </div>

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
              Chi tiết sản phẩm
            </div>
            <div className="product-detail-description">
              <ReactQuill
                theme="snow"
                value={showFullDescription ? product.Description : truncateDescription(product.Description)}
                readOnly={true}
                modules={{ toolbar: null }}
                className="quill-no-border border-none"

              />
              {!showFullDescription ? (
                <button className=' btn btn-primary ' onClick={() => setShowFullDescription(true)}>Xem thêm</button>
              ) : (
                <button className=' btn btn-primary ' onClick={() => setShowFullDescription(false)}>Thu gọn</button>
              )}
            </div>

          </div>


        </div>





        {/* comment section */}
        <h1 className='text-3xl font-bold mb-4 text-center'>Nhận xét</h1>
        <div className="d-flex align-items-center justify-content-center">
          <div className="container">

            {dataComment.length > 0 && dataComment.map((comment, index) => (
              <div className="row justify-content-center mb-4" key={index}>
                <div className="col-lg-8">
                  <div className="comments">

                    <div className="comment d-flex mb-4" >
                      <div className="flex-shrink-0">
                        <div className="avatar avatar-sm rounded-circle">
                          <img className="avatar-img" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-2 ms-sm-3">
                        <div className="comment-meta d-flex align-items-baseline">
                          <h6 className="me-2">{comment.name}</h6>
                          <span className="text-muted">{comment.date_create}</span>
                        </div>
                        <div className="comment-body">
                          {comment.content}
                        </div>
                        {comment.content_reply != '' && (
                          <div className="comment-replies bg-light p-3 mt-3 rounded">
                            <div className="reply d-flex mb-4">
                              <div className="flex-shrink-0">
                                <div className="avatar avatar-sm rounded-circle">
                                  <img className="avatar-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJH2vP6Ji_pkqdlVhLkOyVC7Ebiexss_ln3A&usqp=CAU" alt="" />
                                </div>
                              </div>
                              <div className="flex-grow-1 ms-2 ms-sm-3">
                                <div className="reply-meta d-flex align-items-baseline">
                                  <h6 className="mb-0 me-2">BeautyShop</h6>
                                  <span className="text-muted">{comment.date_reply}</span>
                                </div>
                                <div className="reply-body">
                                  {comment.content_reply}
                                </div>
                              </div>
                            </div>

                          </div>
                        )}

                      </div>
                    </div>



                  </div>
                </div>
              </div>
            ))}

            <div className="row justify-content-center">

              <div className="col-lg-8">
                <div className="comment-form d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avatar avatar-sm rounded-circle">
                      <img className="avatar-img" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-2 ms-sm-3">
                    <div className='flex'>
                      <input className="form-control py-0 px-1 border-0 " placeholder="Start writing..." value={comment} onChange={(e) => setComment(e.target.value)} style={{ resize: "none", width: "80%" }}></input>
                      <button className="btn btn-primary ml-2  w-[20%]" onClick={handleComment}>Nhập</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default ProductDetails;
