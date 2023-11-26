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
      <div class="menu mt-20">

        <div class="menu-body">
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center" data-bs-toggle="dropdown">
              <div class="avatar me-3">
                {/* <img src="../images/user/man_avatar5.jpg"
                  class="rounded-circle" alt="image" /> */}
              </div>
              <div>
                <div class="fw-bold">Văn Hào</div>
                <small class="text-muted">Admin</small>
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
                <span class="nav-link-icon">
                  <i class="bi bi-truck"></i>
                </span>
                <span>Products</span>
              </Link>

            </li>
            <li className={selectedItem === 'Category' ? 'selected' : ''}>
              <Link to="/admin/category" onClick={() => handleItemClick('Category')}>
                <span class="nav-link-icon">
                  <i class="bi bi-wallet2"></i>
                </span>
                <span>Category</span>
              </Link>

            </li>
            <li className={selectedItem === 'Customers' ? 'selected' : ''}>
              <Link to='/admin/users' onClick={() => handleItemClick('Customers')}>
                <span class="nav-link-icon">
                  <i class="bi bi-person-badge"></i>
                </span>
                <span>Customers</span>
              </Link>
            </li>
            <li className={selectedItem === 'Invoices' ? 'selected' : ''}>
              <a href="#" onClick={() => handleItemClick('Invoices')}>
                <span class="nav-link-icon">
                  <i class="bi bi-receipt"></i>
                </span>
                <span>Invoices</span>
              </a>

            </li>










          </ul>
        </div>
      </div>
      {/* <!-- ./  menu --> */}

    </motion.div >

  );
};
