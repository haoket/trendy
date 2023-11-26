import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.href = '/auth/login';

  };
  return (
    <div className="sm:h-[10vh] bg-gray-300  p-2 fixed w-full z-10 flex items-center justify-between">
      <div className="flex justify-between items-center">
        <div className=" text-white sm:text-2xl ms:mt-3 sm:ml-3 font-semibold">
          <div class="menu-header">
            <a href="./dashboard.html" class="menu-header-logo">
              <img src="../logo.svg" alt="logo" />
              <span>ADMIN </span>
            </a>
            <a href="#" class="btn btn-sm menu-close-btn">
              <i class="bi bi-x"></i>
            </a>
          </div>
        </div>


      </div>
      <div className="">

        <button className="text-white px-4 py-1 bg-blue-500 rounded-[20px]" onClick={handleLogout} style={{ fontSize: "1rem" }}>
          Logout
        </button>

      </div>
    </div>
  );
};
