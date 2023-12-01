import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlog, deleteBlog } from "../../../utils/apiCalls";

const Blog = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchBlog = async () => {
        const data = await getBlog();
        setData(data);
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const handleDelete = (id) => {
        deleteBlog(id);
        fetchBlog();
    };

    const handleUpdate = (id) => {
        navigate("/admin/updateBlog/" + id);
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
                        <li className="breadcrumb-item active" aria-current="page">Blog</li>
                    </ol>
                </nav>
            </div>
            <button onClick={() => navigate("/admin/create-blog")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm blog</button>

            <table className="min-w-full border-collapse m-6  ">
                <thead>
                    <tr>

                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Actions
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b" >
                            Title
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
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleUpdate(item.id)}
                                >
                                    Update
                                </button>
                            </td>
                            <td className="">
                                <p className="text-xs">{item.title}</p>
                            </td>
                            <td className="" >
                                <p className="text-xs/[9px]">{item.description}</p>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Blog;
