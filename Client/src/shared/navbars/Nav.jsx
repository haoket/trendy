import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingBag, FaSearch } from "react-icons/fa";
// import './nav.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import { apiDomain } from '../../utils/utilsDomain';
// import '../../context/Context'

import '../../css/app.css'
import '../../css/grid.css'




const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setCartItems: updateItemsCount } = useContext(Context);
  const [itemSearch, setItemSearch] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.href = '/auth/login';
  };


  const user = JSON.parse(localStorage.getItem('user'));
  return (

    <>
      {/* <!-- header -->/ */}
      <header>
        {/* <!-- mobile menu --> */}
        <div className="mobile-menu bg-second">
          <a href="#" className="mb-logo">ATShop</a>
          <span className="mb-menu-toggle" id="mb-menu-toggle">
            <i className='bx bx-menu'></i>
          </span>
        </div>
        {/* <!-- end mobile menu --> */}
        {/* <!-- main header --> */}
        <div className="header-wrapper" id="header-wrapper">
          <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close">
            <i className='bx bx-x'></i>
          </span>
          {/* <!-- top header --> */}
          <div className="bg-second ">
            <div className="top-header container">
              <ul className="devided">
                <li>
                  <a href="#">+840123456789</a>
                </li>
                <li>
                  <a href="#">atshop@mail.com</a>
                </li>
              </ul>
              <ul className="devided">
                <li className="dropdown">
                  <a href="">USD</a>
                  <i className='bx bxs-chevron-down'></i>
                  <ul className="dropdown-content">
                    <li><a href="#">VND</a></li>
                    <li><a href="#">JPY</a></li>
                    <li><a href="#">EUR</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="">ENGLISH</a>
                  <i className='bx bxs-chevron-down'></i>
                  <ul className="dropdown-content">
                    <li><a href="#">VIETNAMESE</a></li>
                    <li><a href="#">JAPANESE</a></li>
                    <li><a href="#">FRENCH</a></li>
                    <li><a href="#">SPANISH</a></li>
                  </ul>
                </li>
                <li><a href="#">ORDER TRACKING</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- end top header --> */}
          {/* <!-- mid header --> */}
          <div className="bg-main">
            <div className="mid-header container">
              <Link to="/" className="logo">Aura</Link>
              <div className="search">
                <input type="text" placeholder="Search" onChange={(e) => setItemSearch(e.target.value)} />
                <Link to={`/products/search=${itemSearch}`}>
                  <button>     <i className='bx bx-search-alt'></i></button>
                </Link>


              </div>
              <ul className="user-menu">
                {user && (
                  <>
                    <Link to="/profile" >
                      <div className='flex justify-center flex-col items-center'>
                        <img src={apiDomain + "/image/" + user.img} alt="" className='rounded-full w-10 h-10' />
                        <h1 className='text-sm w-20'>{user.name}</h1>
                      </div></Link>
                    <button className="btn w-full" onClick={handleLogout} style={{ fontSize: "1rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>


                    </button>
                  </>
                )}


                <NavLink to="/cart" className="relative  flex  items-center  ">
                  <FaShoppingBag />
                  {cartItems.length > 0 && (
                    <span className="notification-badge ">{cartItems.length}</span>
                  )}
                </NavLink>
              </ul>
            </div>
          </div>
          {/* <!-- end mid header --> */}
          {/* <!-- bottom header --> */}
          <div className="bg-second">
            <div className="bottom-header container">
              <ul className="main-menu">
                <li><NavLink to="/">Home</NavLink></li>
                {/* <!-- mega menu --> */}
                <li className="mega-dropdown">

                  <NavLink to="/products" >
                    Cửa hàng
                    <i className='bx bxs-chevron-down'></i>
                  </NavLink>
                  {/* <div className="mega-content">
                    <div className="row">
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li><a href="#">Wireless</a></li>
                            <li><a href="#">Inear headphone</a></li>
                            <li><a href="#">Overear headphone</a></li>
                            <li><a href="#">sport headphone</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li><a href="#">Wireless</a></li>
                            <li><a href="#">Inear headphone</a></li>
                            <li><a href="#">Overear headphone</a></li>
                            <li><a href="#">sport headphone</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li><a href="#">Wireless</a></li>
                            <li><a href="#">Inear headphone</a></li>
                            <li><a href="#">Overear headphone</a></li>
                            <li><a href="#">sport headphone</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 col-md-12">
                        <div className="box">
                          <h3>Categories</h3>
                          <ul>
                            <li><a href="#">Wireless</a></li>
                            <li><a href="#">Inear headphone</a></li>
                            <li><a href="#">Overear headphone</a></li>
                            <li><a href="#">sport headphone</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row img-row">
                      <div className="col-3">
                        <div className="box">
                          <img src="./images/kisspng-beats-electronics-headphones-apple-beats-studio-red-headphones.png" alt="" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src="./images/JBL_TUNE220TWS_ProductImage_Pink_ChargingCaseOpen.png" alt="" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src="./images/JBL_JR 310BT_Product Image_Hero_Skyblue.png" alt="" />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="box">
                          <img src="./images/JBLHorizon_001_dvHAMaster.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </li>
                {/* <!-- end mega menu --> */}
                <li><a href="#">blog</a></li>
                <li><a href="#">contact</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- end bottom header --> */}
        </div>
        {/* <!-- end main header --> */}
      </header>
    </>



  );
};

export default Navbar;
