import React, { useEffect, useState } from "react";
import { apiDomain } from "../../../utils/utilsDomain";
import axios from "axios";
import Loading from "../amination/Loading";

export const OrderWaiting = () => {
    const [Order, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Thay đổi trạng thái loading thành false sau 2 giờ
        }, 2000);
    })



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
    const getOrdersByStatus = async () => {
        try {
            const response = await axios.get(`${apiDomain}/getOrderByStatus`, {
                params: {
                    status: 0,
                    id: user.id,
                }
            });
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }


    };

    useEffect(() => {
        getOrdersByStatus();
    }, []);

    return (<>
        {loading ? (
            <Loading />
        ) : (
            <div className='bg-gray-200 w-full h-100 mt-50'>

                <ul>
                    {Order.map((item, index) => (
                        <li key={index} className="flex flex-col bg-gray-300 p-4">
                            <p className="p-2">ID đơn hàng: {item.ID}</p>
                            {item.products.map((product, index) => (
                                <div key={index} className="flex justify-between p-2 bg-slate-100 m-2">
                                    <div className="grid-grows-1">
                                        <img src={apiDomain + "/image/" + parseImageLink(product.img)} alt="" width={100} height={100} />
                                    </div>
                                    <div className="grid-grows-1">
                                        <p className="p-2 text-lg"> {product.Name}</p>
                                    </div>
                                    <div className="grid-rows-1">
                                        <p className="">Số luong: {product.Quantity}</p>
                                    </div>
                                    <div className="grid-grows-1">
                                        <p>Giá sản phẩm: {product.Price}</p>
                                    </div>
                                </div>

                            ))}

                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
    )
}