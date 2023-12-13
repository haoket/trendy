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
  const { cartItems } = useContext(Context);
  const [itemSearch, setItemSearch] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [classActive, setClassActive] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.href = '/auth/login';
  };

  const handleDisplayMenu = () => {
    if (isActive) {
      setClassActive('header-wrapper');
      setIsActive(false);
    } else {
      setClassActive('header-wrapper active');
      setIsActive(true);
    }
  }
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      {/* <!-- header -->/ */}
      <header>
        {/* <!-- mobile menu --> */}
        <div className="mobile-menu bg-second" >
          <Link to='/' className="mb-logo">ATShop</Link>
          <span className="mb-menu-toggle" id="mb-menu-toggle" onClick={handleDisplayMenu}>
            <i className='bx bx-menu'></i>
          </span>
        </div>
        {/* <!-- end mobile menu --> */}
        {/* <!-- main header --> */}
        <div className={classActive} id="header-wrapper">
          <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close" onClick={handleDisplayMenu}>
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
              <Link to="/" className="logo" onClick={handleDisplayMenu}>Aura</Link>
              <div className="search">
                <input type="text" placeholder="Tìm kiếm..." onChange={(e) => setItemSearch(e.target.value)} />
                <a href={`/search/${itemSearch}`} >
                  <button>     <i className='bx bx-search-alt'></i></button>
                </a>


              </div>
              <ul className="user-menu gap-10">
                <NavLink to="/cart" className="relative  flex items-center  ">
                  <FaShoppingBag style={{ fontSize: "2rem" }} />

                  {cartItems.length > 0 && (
                    <span className="notification-badge text-[#f42c37] w-6 h-6 flex items-center justify-center font-bold text-xl absolute top-0 right-0 mr-[-10px] rounded-full border-red-500 border-1">{cartItems.length}</span>
                  )}
                </NavLink>
                <div>
                  {user && (
                    <>
                      <Link to="/profile " >
                        <div className='flex justify-center flex-col items-center'>
                          {/* <img src={apiDomain + "/image/" + user.img} alt="" className='rounded-full  h-10' /> */}
                          <h1 className='text-[15px] flex justify-center items-center mr-2'>Tài khoản: {user.name}</h1>
                        </div></Link>

                      <button className="btn text-[10px] border border-[#f42c37] hover:bg-[#f42c37]" onClick={handleLogout} >

                        Đăng xuất
                      </button>
                    </>
                  )}
                </div>



              </ul>
            </div>
          </div>
          {/* <!-- end mid header --> */}
          {/* <!-- bottom header --> */}
          <div className="bg-second">
            <div className="bottom-header container">
              <ul className="main-menu">
                <li><NavLink to="/" onClick={handleDisplayMenu}>Trang chủ</NavLink></li>
                {/* <!-- mega menu --> */}
                <li className="mega-dropdown">

                  <NavLink to="/products" onClick={handleDisplayMenu} >
                    Cửa hàng
                  </NavLink>
                </li>
                {/* <!-- end mega menu --> */}
                <li><Link to='/about' onClick={handleDisplayMenu}>Giới thiệu</Link></li>
                <li><Link to='/blog' onClick={handleDisplayMenu}>blog</Link></li>
                <li><Link to='/contact' onClick={handleDisplayMenu}>Liên hệ</Link></li>
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
