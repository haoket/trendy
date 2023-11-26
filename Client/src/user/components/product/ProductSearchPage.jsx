import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import axios from 'axios';
//Lấy danh sách sản phẩm
const ProductSearchPage = () => {

    const { slug } = useParams();
    console.log('====================================');
    console.log(slug);
    console.log('====================================');
    const handleSearch = async () => {
        try {
            const response = await axios.get(`${slug}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }

    }




    useEffect(() => {

        handleSearch();



    }, [slug]);





    return (
        <>


            {/* <!-- end products content --> */}






            {/* 
      <div className="sm:flex" >
        <div>
          <div className="flex bg-[#ededed] p-3 rounded-[50px] m-6 ">
            <input
              type="email"
              placeholder="Search Here"
              className="bg-[#ededed] mx-2"
            />
            <button className="bg-[#f42c37] rounded-[50px] py-2 px-2 text-[#ffffff]">
              <FaSearch />
            </button>
          </div>
          <h1 className="font-bold text-1xl mb-3 tracking-wide m-6 cursor-pointer">
            Product Categories <FaCaretDown className={`inline ml-1`} />
          </h1>





          {data.length > 0 && data.map((item, index) => (
            <ul key={index} className="text-[#7f7f7f] mx-5 mb-3 tracking-wide">
              <li className="hover:text-[#f42c37] pl-10  cursor-pointer hover:font-bold"  >
                <Link to={`/products/${item.slug}`} >
                  {item.Name}
                </Link>

              </li>
            </ul>
          ))}
          <hr />
          <h1
            className="font-bold text-1xl tracking-wide m-6 cursor-pointer"
            onClick={togglePrice}
          >
            Choose Price{" "}
            <FaCaretDown
              className={`inline ml-1 ${showPrice ? "transform rotate-180" : ""
                }`}
            />
          </h1>

          {showPrice && <PriceFilter />}
        </div>
        <div className="p-6">
          <div>
            <h1 className="font-bold text-4xl mb-4">Shop</h1>
            <h1 className="text-[#0d0d0d] mb-4">
              Showing 1-9 of 10 results
            </h1>
          </div>




          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">



            {dataProduct.map((product, index) => (
              <div key={index} className="flex flex-col gap-2 cursor-pointer select ">
           
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
                    onClick={() => handleAddToCart(product.ID)} 
                  >
                    Add to Cart
                  </button>
                </div>




              </div>


            ))}
          </div>
        </div>
      </div > */}



        </>
    );
};

export default ProductSearchPage;
