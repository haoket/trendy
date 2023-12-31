import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import { getCategory, getProductBySlug } from "../../../utils/apiCalls";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loading from "../amination/Loading";
//Lấy danh sách sản phẩm
const ProductCategories = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [selectedOption, setSelectedOption] = useState('');


  const handleSortChange = (event) => {
    // Lấy giá trị được chọn từ thẻ select và set vào state
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case 'price-asc':
        setDataProduct([...dataProduct].sort((a, b) => a.Price - b.Price));
        break;
      case 'price-desc':
        setDataProduct([...dataProduct].sort((a, b) => b.Price - a.Price));
        break;
      default:
        // Nếu không có case nào khớp, không làm gì cả
        break;
    }
  };


  //lấy data product by category
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
  const getProductByCategory = async () => {
    try {
      const data = await axios.get(`${apiDomain}/getPrductByCategory/${slug}`);
      setDataProduct(Object.values(data)[0]);
      console.log('====================================');
      console.log("response", dataProduct);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  useEffect(() => {
    getProductByCategory();
    fetchCategory();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [slug]);
  // lấy danh sách danh mục
  const fetchCategory = async () => {
    try {
      const result = await getCategory();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Invalid data returned from getCategory");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Calculate the index of the last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate the index of the first product on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get the current products to display
  const currentProducts = dataProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="bg-main">
        <div className="container">
          <div className="box">
            <div className="breadcumb">
              <Link to="/">Trang chủ</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <Link to='/products'>Tất cả sản phẩm</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <span>{slug}</span>
            </div>
          </div>
          <div className="box">
            <div className="row">
              <div className=" col-md-2  col-12 " id="filter-col" style={{ borderRight: '2px solid #e5e5e5' }}>
                <span className="filter-header">
                  Danh mục
                </span>
                <div className="box md:flex-col flex justify-between " >
                  {data.length > 0 && data.map((item, index) => (
                    <ul key={index} className="flex  text-[#7f7f7f] mb-3 ">
                      <li className="hover:text-[#f42c37]  cursor-pointer hover:font-bold"  >
                        <Link to={`/products/${item.slug}`} className={`relative  ${item.slug === slug ? 'text-[#f42c37] font-bold' : ''}`}>
                          {item.Name}
                          {item.slug === slug && (
                            <span style={{
                              position: 'absolute',
                              top: "2px",
                              left: "-10px",
                              width: "0",
                              height: "0",
                              borderTop: "7px solid transparent",
                              borderLeft: "10px solid red",
                              borderBottom: "7px solid transparent",
                            }}>
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
                <div>
                  <h1 className="text-black mb-3 bg-[#f2f2f2] p-2 mt-5">Lọc <FontAwesomeIcon className="text-red-500" icon="fa-solid fa-filter" /></h1>
                  <select value={selectedOption} id="" onChange={handleSortChange}>
                    <option value="">chọn</option>
                    <option value="price-asc" >
                      Giá thấp đến cao
                    </option>
                    <option value="price-desc">Giá từ cao đến thấp</option>

                  </select>
                </div>
              </div>
              <div className="col-12 col-md-10">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="box">
                    <div className="row" id="products">

                      <div className="container">
                        <div className="row" id="latest-products">
                          {currentProducts.map((product, index) => (
                            <div className="col-6 col-md-3 listproduct ">

                              <img className="image-product" src={apiDomain + "/image/" + parseImageLink(product.ImageLink)[0]} alt="" />
                              {product.Quantity === 0 &&
                                <img className='label-new' src="https://png.pngtree.com/png-clipart/20230806/original/pngtree-sold-out-blue-red-rubber-vector-picture-image_9913566.png" alt="" />
                              }
                              <div className="font-medium md:pt-4 pt-2">
                                <p className='md:text-[15px] text-center'>{product.Name}</p>
                                <p className='text-center md:text-[18px] text-red'>{product.Price}.000 VNĐ</p>
                              </div>
                              <div className="btn-product">
                                <Link to={`/product/${product.ID}`} className='btn-view-product'>
                                  <button className=""><i className="bi bi-search  hover:text-blue-500 text-2xl "></i></button>
                                </Link>
                                {product.Quantity != 0 &&
                                  <button className=''><i className="bi bi-cart-plus hover:text-blue-500 text-2xl "></i></button>
                                }
                              </div>
                            </div>
                          ))}




                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div div className="box">
                  <ul className="pagination">
                    {Array.from({ length: Math.ceil(dataProduct.length / productsPerPage) }, (_, index) => (
                      <li key={index} className={currentPage === index + 1 ? "active" : ""}>
                        <a href="#" onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >

    </>
  );
};

export default ProductCategories;
