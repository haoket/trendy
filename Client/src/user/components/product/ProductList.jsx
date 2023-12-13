import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDomain } from '../../../utils/utilsDomain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCategory, getProducts, getProductsPriceDesc, getProductsPriceAsc } from "../../../utils/apiCalls";
import Loading from "../amination/Loading";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [selectedOption, setSelectedOption] = useState('');
  const fetchProducts = async () => {
    const data = await getProducts();
    setDataProduct(data);
  };


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

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
              <Link to="/">home</Link>
              <span><i className='bx bxs-chevrons-right'></i></span>
              <a href="#">all products</a>
            </div>
          </div>
          <div className="box">
            <div className="row">
              {/* nav danh mục */}
              <div className=" col-md-2  col-12 " id="filter-col">
                <span className="filter-header">
                  Danh mục
                </span>
                <div className="box md:flex-col flex justify-between " >
                  {data.length > 0 && data.map((item, index) => (
                    <ul key={index} className="flex  text-[#7f7f7f] mb-3 ">
                      <li className="hover:text-[#f42c37]  cursor-pointer hover:font-bold"  >
                        <Link to={`/products/${item.slug}`} >
                          {item.Name}
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
                <div>
                  <h1>Lọc <FontAwesomeIcon icon="fa-solid fa-filter" /></h1>
                  <select value={selectedOption} id="" onChange={handleSortChange}>
                    <option value="">chọn</option>
                    <option value="price-asc" >
                      Giá thấp đến cao
                    </option>
                    <option value="price-desc">Giá từ cao đến thấp</option>

                  </select>
                </div>
              </div>

              {/* hiển thị sản phẩm */}
              <div className="col-12 col-md-9">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="box">
                    <div className="row" id="products">

                      <div className="container">
                        <div className="row" id="latest-products">
                          {currentProducts.map((product, index) => (
                            <div className="col-12 col-md-4 col-sm-6" key={index}>
                              <div className="product-card">
                                < div className="product-card-img" >
                                  <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)[0]} alt="" />
                                  <img src={apiDomain + "/image/" + parseImageLink(product.ImageLink)[1]} alt="" />
                                </div >
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
                )}
                <div className="box">
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

export default ProductList;
