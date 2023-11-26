import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDomain } from '../../../utils/utilsDomain';
import Clients from "../../../shared/Clients";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import PriceFilter from "../../../shared/Range";
import { data } from "autoprefixer";
import { ToastContainer, toast } from 'react-toastify';
import { getCategory, getProducts } from "../../../utils/apiCalls";
// import filterProductsByCategory from "./FilterController"; 




//Lấy danh sách sản phẩm
const ProductList = () => {
  const [showPrice, setShowPrice] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  const numberOfProducts = 20;
  const displayedProducts = data.slice(0, numberOfProducts);


  //lấy data product
  const fetchProducts = async () => {
    const data = await getProducts();
    setDataProduct(data);
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
    fetchCategory();
    fetchProducts();
  }, []);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Gọi hàm để lọc sản phẩm theo danh mục ở đây
  }



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

  const togglePrice = () => {
    setShowPrice(!showPrice);
  };

  return (
    <>

      {/* <!-- products content --> */}
      <div className="bg-main">
        <div className="container">
          <div className="box">
            <div className="breadcumb">
              <Link to="/">home</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <a href="#">all products</a>
            </div>
          </div>
          <div className="box">
            <div className="row">
              <div className="col-3 filter-col" id="filter-col">
                <div className="box">
                  <span className="filter-header">
                    Categories
                  </span>


                  {data.length > 0 && data.map((item, index) => (
                    <ul key={index} className="filter-list text-[#7f7f7f] mx-5 mb-3 tracking-wide">
                      <li className="hover:text-[#f42c37] pl-10  cursor-pointer hover:font-bold"  >
                        <Link to={`/products/${item.slug}`} >
                          {item.Name}
                        </Link>

                      </li>
                    </ul>
                  ))}

                </div>
              </div>
              <div className="col-6 col-md-9">

                <div className="box">
                  <div className="row" id="products">

                    <div className="container">
                      <div className="row" id="latest-products">
                        {dataProduct.map((product, index) => (
                          <div className="col-3 col-md-3 col-sm-12" key={index}>
                            <div className="product-card">
                              <div className="product-card-img">
                                <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                                <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)} alt="" />
                              </div>
                              <div className="product-card-info">
                                <div className="product-btn">
                                  <Link to={`/product/${product.ID}`}>
                                    <button className="btn-flat btn-hover btn-shop-now">Chi tiết</button>
                                  </Link>
                                  <button className="btn-flat btn-hover btn-cart-add">
                                    <i className='bx bxs-cart-add'></i>
                                  </button>

                                </div>
                                <div className="product-card-name">
                                  {product.Name}
                                </div>
                                <div className="product-card-price">
                                  {/* <span><del>300</del></span> */}
                                  <span className="curr-price">{product.Price}.000 VNĐ</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}

                      </div>
                    </div>

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
          </div>
        </div>
      </div>
      {/* <!-- end products content --> */}


    </>
  );
};

export default ProductList;
