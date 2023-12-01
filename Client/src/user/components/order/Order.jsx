import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiDomain } from "../../../utils/utilsDomain";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../../context/Context";
import { Navigate, useNavigate } from 'react-router-dom';
export const Order = () => {

    const [cartItems, setCartItems] = useState([]);
    const { setCartItems: updateItemsCount } = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [method_payment, setMethod_payment] = useState('COD');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const date_create = new Date();
    const navigate = useNavigate();


    const dataOder = {
        CustomerID: user.id,
        TotalAmount: totalPrice,
        name: name,
        address: address,
        email: user.email,
        method_payment: method_payment,
        message: message,
        phone: phone,
        date_create: date_create,

    }


    const createOrder = async () => {
        const idPayment = await axios.post(`${apiDomain}/create-order`, dataOder);
        const id = idPayment.data;
        for (const item of cartItems) {
            const data = {
                ProductID: item.ID,
                OrderID: id,
                Price: item.price,
                Quantity: item.quantity,
            }

            await axios.post(`${apiDomain}/create-order-item`, data);

        }
        toast.success(`Đặt hàng thành công`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        await axios.delete(`${apiDomain}/delete-cart`);
        setCartItems([]);

        setTimeout(() => {
            navigate("/profile"); // Chuyển hướng sau 2 giây
        }, 2000);




    }
    //lấy hình ảnh đầu tiên của mảng
    const parseImageLink = (imageLink) => {

        try {
            const imageArray = JSON.parse(imageLink);
            if (Array.isArray(imageArray) && imageArray.length > 0) {
                return imageArray[0];
            }
        } catch (error) {
            console.error('Error parsing ImageLink:', error);
        }
        return null;
    };
    // Function to get the cart items using Axios
    const getCartItems = async () => {
        try {
            const response = await axios.get(`${apiDomain}/cart`);

            setCartItems(response.data);
            updateItemsCount(response.data);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
        }



    };

    useEffect(() => {
        getCartItems();
        console.log(cartItems);
        calculateTotalPrice();

    }, [isLoading]);

    // tính toán tổng tiền
    const calculateTotalPrice = () => {
        if (!isLoading) { // Kiểm tra nếu dữ liệu đã sẵn sàng
            const totalPrice = cartItems.reduce(
                (sum, item) => sum + (item.price || 0),
                0
            );
            setTotalPrice(totalPrice);
        }
    };

    return (

        <div className='flex flex-col px-16'>
            <ToastContainer />
            <h1 className='font-bold text-xl'>Thông tin thanh toán:</h1>

            <p>Tên khách hàng</p>
            <input type="text" className='border border-gray rounded-md w-2/3 px-2 py-1' value={user.name} onChange={(e) => setName(e.target.value)} />

            <p>Số điện thoại nhận hàng</p>
            <input type="text" className='border border-gray rounded-md w-2/3 px-2 py-1' onChange={(e) => setPhone(e.target.value)} />

            <p>Địa chỉ nhận hàng</p>
            <input type="text" onChange={(e) => setAddress(e.target.value)} className='border border-gray rounded-md w-2/3 px-2 py-1' />
            <table className='mt-4 '>
                <thead>
                    <tr className='border-b-4' >
                        <th><p className='text-left'>Sản phẩm</p></th>
                        <th><p className='text-center'>Đơn giá</p></th>
                        <th><p className='text-left'>Số lượng</p></th>
                        <th><p className='text-right'>Thành tiền</p></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.cart_id}>
                            <td><p className='text-left'>{item.Name}</p></td>
                            <td><p className='text-center'>{item.price / item.quantity}</p></td>
                            <td><p className='text-left'>{item.quantity}</p></td>
                            <td><p className='text-right'>{item.price}</p></td>
                        </tr>
                    ))}

                    <tr className='border-b-4 border-t-4'>
                        <td><p className='text-left m-2' onChange={(e) => setMessage(e.target.value)}>Lời nhắn <input type="text" className='border border-gray rounded-md w-2/3 px-2 py-1 ml-4' /></p>

                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}><p className='text-right'>Tổng tiền: {totalPrice}</p> </td>
                    </tr>
                </tbody>
            </table>
            <div><p className='font-bold text-xl'>Phương thức thanh toán</p></div>
            <select name="method_payment" onChange={(e) => setMethod_payment(e.target.value)} className='border border-gray rounded-md w-1/5 px-2 py-1 mt-4 mb-4'>
                <option value="COD">COD</option>
                <option value="MOMO">MOMO</option>
                <option value="ZALO">ZALO</option>
            </select>


            <button onClick={createOrder} className='bg-red-500 w-80 hover:bg-red-700 text-white px-8 py-3 text-[#666666] rounded-1xl cursor-pointer' >Đặt hàng</button>


        </div>
    )
}
