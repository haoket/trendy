import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingBag, FaSearch } from "react-icons/fa";
import './nav.css';
import { Context } from '../../context/Context';
// import '../../context/Context'




const Navbar = () => {
  const { cartItems } = useContext(Context);
  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.href = '/auth/login';
  };

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <div className="navbar">

        <div className='text-[#f42c37] tracking-wider text-3xl font-bold'>
          <Link to="/">TrendyHub</Link>

        </div>
        <div className="links">
          {user && (
            <>
              <NavLink to="/" >
                Trang chủ
              </NavLink>
              <NavLink to="/products" >
                Cửa hàng
              </NavLink>
              <NavLink to="/about" >
                Về chúng tôi
              </NavLink>
              <NavLink to="/blog" >
                Blog
              </NavLink>
              <NavLink to="/contact" >
                Liên hệ
              </NavLink>
              <NavLink to="/track" >
                Track Order
              </NavLink>
            </>

          )}
        </div>
        {!user && (
          <NavLink to="/auth/login" className="btn">
            Đăng nhập
          </NavLink>
        )}
        {user && (




          <button className="btn" onClick={handleLogout} style={{ fontSize: "1rem" }}>
            {/* <h1>{user}</h1> */}
            Đăng xuất
          </button>
        )}


        <div className='nav-icons'>
          <p>
            < FaSearch />

          </p>
          <p>

            <NavLink to="/cart" className="relative  flex  items-center  ">
              <FaShoppingBag />
              {cartItems.length > 0 && (
                <span className="notification-badge">{cartItems.length}</span>
              )}
            </NavLink>

          </p>
        </div>
      </div>
      <div className='nav-links'>
        <div className='links'>

        </div>
      </div>

    </>

  );
};

export default Navbar;
