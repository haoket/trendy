import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../../utils/apiCalls";

const ProductsTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchProducts = async () => {
        const data = await getProducts();
        setData(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        deleteProduct(id);
        fetchProducts();
    };

    const handleUpdate = (id) => {
        navigate("/admin/update/" + id);
    };

    return (

        <div>
            <div className="mb-4 mt-10 px-4">
                <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">
                                <i className="bi bi-globe2 small me-2"></i> Dashboard
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Product</li>
                    </ol>
                </nav>
            </div>
            <button onClick={() => navigate("/admin/createproduct")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm sản phẩm</button>

            <table className="min-w-full border-collapse m-6  ">
                <thead>
                    <tr>

                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Actions
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b" >
                            Product Name
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Price
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Category
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold  uppercase text-sm border-b " >
                            Description
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1 "
                                    onClick={() => handleDelete(item.ID)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleUpdate(item.ID)}
                                >
                                    Update
                                </button>
                            </td>
                            <td className="">
                                <p className="text-xs">{item.Name}</p>
                            </td>
                            <td className="">{item.Price}</td>
                            <td className="">
                                <p className="text-xs">{item.Category}</p>
                            </td>
                            <td className="" >
                                <p className="text-xs/[9px]">{item.Description}</p>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ProductsTable;
