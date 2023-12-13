export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');

    window.location.href = '/auth/login';

  };
  return (
    <div className="sm:h-[50px] bg-gray-300   p-2 fixed w-full z-10 flex items-center justify-between">
      <div className="flex justify-between items-center">
        <div className=" text-white sm:text-2xl ms:mt-3 sm:ml-3 font-semibold">
          <div className="menu-header">
            <a href="./dashboard.html" className="menu-header-logo">

              <span>ADMIN </span>
            </a>
            <a href="#" className="btn btn-sm menu-close-btn">
              <i className="bi bi-x"></i>
            </a>
          </div>
        </div>


      </div>
      <div className="">

        <button className="text-white px-4 py-1 bg-blue-500 rounded-[20px]" onClick={handleLogout} style={{ fontSize: "1rem" }}>
          Đăng xuất
        </button>

      </div>
    </div>
  );
};
