import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import '../../admin/css/app.css'
import { useEffect, useState } from "react";
export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <motion.div
      className="hidden sm:block w-[30%] bg-white min-h-[90vh] py-4"
      initial={{ opacity: 0, x: -100 }} // Example initial animation properties
      animate={{ opacity: 1, x: 0 }} // Example animate animation properties
      transition={{ duration: 0.5 }} // Example transition properties
    >

      {/* <!-- menu --> */}
      <div className="menu mt-20">

        <div className="menu-body">
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center" data-bs-toggle="dropdown">
              <div className="avatar me-3">
                {/* <img src="../images/user/man_avatar5.jpg"
                  class="rounded-circle" alt="image" /> */}
              </div>
              <div>
                <div className="fw-bold">Văn Hào</div>
                <small className="text-muted">Admin</small>
              </div>
            </a>

          </div>
          <ul>
            <li className={selectedItem === 'Dashboard' ? 'selected' : ''}>
              <Link to="" onClick={() => handleItemClick('Dashboard')}>
                <span className="nav-link-icon">
                  <i className="bi bi-bar-chart"></i>
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={selectedItem === 'Orders' ? 'selected' : ''}>
              <Link to="/admin/orders" onClick={() => handleItemClick('Orders')}>
                <span className="nav-link-icon">
                  <i className="bi bi-receipt"></i>
                </span>
                <span>Orders</span>
              </Link>
            </li>
            <li className={selectedItem === 'Products' ? 'selected' : ''}>
              <Link to="/admin/products" onClick={() => handleItemClick('Products')}>
                <span className="nav-link-icon">
                  <i className="bi bi-truck"></i>
                </span>
                <span>Products</span>
              </Link>

            </li>
            <li className={selectedItem === 'Category' ? 'selected' : ''}>
              <Link to="/admin/category" onClick={() => handleItemClick('Category')}>
                <span className="nav-link-icon">
                  <i className="bi bi-wallet2"></i>
                </span>
                <span>Category</span>
              </Link>

            </li>
            <li className={selectedItem === 'Customers' ? 'selected' : ''}>
              <Link to='/admin/users' onClick={() => handleItemClick('Customers')}>
                <span className="nav-link-icon">
                  <i className="bi bi-person-badge"></i>
                </span>
                <span>Customers</span>
              </Link>
            </li>
            <li className={selectedItem === 'blog' ? 'selected' : ''}>
              <Link to='/admin/blog' onClick={() => handleItemClick('blog')}>
                <span className="nav-link-icon">
                  <i className="bi bi-receipt"></i>
                </span>
                <span>Blog</span>
              </Link>

            </li>
            <li className={selectedItem === 'comment' ? 'selected' : ''}>
              <Link to='/admin/comment' onClick={() => handleItemClick('comment')}>
                <span className="nav-link-icon">
                  <i className="bi bi-chat-left-dots"></i>
                </span>
                <span>Comments</span>
              </Link>

            </li>










          </ul>
        </div>
      </div>
      {/* <!-- ./  menu --> */}

    </motion.div >

  );
};
