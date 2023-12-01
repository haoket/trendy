import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../../utils/utilsDomain';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [iOpenModalDetail, setOpenModalDetail] = useState(false);



  const openModalDetail = (order) => {
    setOpenModalDetail(true);
    setSelectedOrder(order);


  };
  const closeModalDetail = () => {
    setSelectedOrder(null);
    setSelectedStatus('');
    setOpenModalDetail(false);
  };

  //lấy dữ liệu đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiDomain}/getAllOrders`);
      setOrders(response.data);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedStatus('');
    setModalOpen(false);
  };
  const handleUpdateStatus = async () => {
    try {
      // Gọi API để cập nhật trạng thái đơn hàng
      await axios.put(`${apiDomain}/update-orders-status/${selectedOrder.ID}`, { status: selectedStatus });
      toast.success('Order Status Updated successfully', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // Đóng modal sau khi cập nhật
      closeModal();
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  // trạng thái các đơn hàng
  const getStatus = (status) => {
    switch (status) {
      case '0':
        return { text: 'chờ xác nhận', color: 'text-white bg-yellow-600' };
      case '1':
        return { text: 'Đang giao hàng', color: 'text-white  bg-blue-600' };
      case '2':
        return { text: 'Đã giao hàng', color: 'text-white bg-green-600' };
      default:
        return { text: "Đã hủy", color: 'text-white bg-red-600' };
    }
  };



  useEffect(() => {
    fetchOrders();
  }, []);

  // const updateOrderStatus = async (orderId, status) => {
  //   try {
  //     const response = await axios.put(`${apiDomain}/updateOrderStatus/${orderId}`, { status });
  //     toast.success(response.data.message);
  //     fetchOrders();
  //   } catch (error) {
  //     console.error('Error updating order status:', error);
  //   }

  // }

  return (
    <div className='container px-4 mt-10'>

      {/* <!-- content --> */}
      <div class="content ">

        <div class="mb-4">
          <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">
                  <i class="bi bi-globe2 small me-2"></i> Dashboard
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Orders</li>
            </ol>
          </nav>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="d-md-flex gap-4 align-items-center">
              <div class="d-none d-md-flex">All Orders</div>
              <div class="d-md-flex gap-4 align-items-center">
                <form class="mb-3 mb-md-0">
                  <div class="row g-3">
                    <div class="col-md-3">
                      <select class="form-select">
                        <option>Sort by</option>
                        <option value="desc">Desc</option>
                        <option value="asc">Asc</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <select class="form-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" />
                        <button class="btn btn-outline-light" type="button">
                          <i class="bi bi-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-custom table-lg mb-0" id="orders">
            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr>

                  <td>
                    <a href="#">#{order.ID}</a>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>0{order.phone}</td>
                  <td>{order.date_create}</td>
                  <td>{order.TotalAmount}.000 VNĐ</td>
                  <td>
                    <span className={`px-4 py-2 badge border ${getStatus(order.status).color}`}> {getStatus(order.status).text}</span>
                  </td>
                  <td class="text-end">

                    {order.status != '3' && order.status != '2' && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white w-full px-2 py-1 rounded"
                        onClick={() => openModal(order)}
                      >
                        Update Status
                      </button>
                    )}
                    {order.status === '3' && (
                      <button className='disabled bg-gray-500 text-white w-full px-2 py-1 rounded pointer-events-none'>

                        Đơn hàng đã hủy
                      </button>
                    )}
                    {order.status === '2' && (
                      <button className='disabled bg-green-500 text-white w-full px-2 py-1 rounded pointer-events-none'>
                        Đơn hàng đã giao thành công
                      </button>
                    )}
                  </td>
                  <td class="text-end">
                    <div class="d-flex">
                      <div class="dropdown ms-auto">
                        <button data-bs-toggle="dropdown"
                          class="btn btn-floating"
                          aria-expanded="false"
                          onClick={() => openModalDetail(order)}
                        >
                          <i class="bi bi-three-dots"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}



              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl font-bold mb-4">Update Order Status</h3>

                    <h1 className='text-xl font-bold mb-4'>Chi tiết đơn hàng</h1>

                    {selectedOrder.products.map((product) => (
                      <div className='border-2 border-black'>
                        <p className="mb-2">Tên sản phẩm: {product.Name}</p>
                        <p className="mb-2">Giá sản phẩm: {product.Price}</p>
                        <p className="mb-2">Số lượng: {product.Quantity}</p>
                        <hr className='border-1 border-black'></hr>
                      </div>
                    ))}

                    <p className="mb-2">Tình trạng đơn hàng: {getStatus(selectedOrder.status).text}</p>
                    <label className="block mb-4">
                      Cập nhật:
                      <select
                        className="border rounded w-full px-2 py-1"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        {selectedOrder.status === '0' && (
                          <>
                            <option>Chọn</option>
                            <option value="1">Xác nhận đơn hàng</option>
                            <option value="3">Hủy đơn hàng</option>
                          </>
                        )}
                        {selectedOrder.status != '0' && selectedOrder.status != '3' && (

                          <>
                            <option>Chọn</option>
                            <option value="2">Đã giao hàng</option>
                          </>
                        )}
                      </select>
                    </label>
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}


              {iOpenModalDetail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
                  <div className="bg-white p-6 rounded shadow-lg w-1/3">
                    <h3 className="text-xl font-bold mb-4">Update Order Status</h3>

                    <h1 className='text-xl font-bold mb-4'>Chi tiết đơn hàng</h1>

                    {selectedOrder.products.map((product) => (
                      <div className='border-2 border-black'>
                        <p className="mb-2">Tên sản phẩm: {product.Name}</p>
                        <p className="mb-2">Giá sản phẩm: {product.Price}</p>
                        <p className="mb-2">Số lượng: {product.Quantity}</p>
                        <hr className='border-1 border-black'></hr>
                      </div>
                    ))}

                    <p className="mb-2">Tình trạng đơn hàng: {getStatus(selectedOrder.status).text}</p>

                    <div className="flex justify-between ">

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        onClick={closeModalDetail}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </tbody>
          </table>
        </div>

        <nav class="mt-4" aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

      </div>
      {/* <!-- ./ content --> */}





      <ToastContainer />
    </div>
  );
};

export default OrdersTable;
