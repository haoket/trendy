import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCategory, deleteCategory, createCategory } from "../../utils/apiCalls";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    categoryName: yup.string().required("Category Name is required"),
    categoryDescription: yup.string().required("Category Description is required"),
});

const Category = () => {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const fetchCategory = async () => {
        try {
            const result = await getCategory();
            if (Array.isArray(result)) {
                setData(result);
            } else {
                console.error("Invalid data returned from getCategory");
            }
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const { categoryName, categoryDescription } = data;
            const newCategory = {
                Name: categoryName,
                Description: categoryDescription,
            };
            await createCategory(newCategory);
            setOpenModal(false);
            reset();
            fetchCategory();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleDelete = (id) => {
        deleteCategory(id).then(() => {
            fetchCategory();
        });
    };

    const handleUpdate = (id) => {
        // Add your code for updating a category here
        console.log("Update category with ID:", id);
    };

    return (
        <>
            {openModal && (
                <Modal show={openModal} onHide={() => setOpenModal(false)} className="absolute top-1/2 left-1/2 bg-gray-200 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded ">
                    <Modal.Header className="flex justify-center items-center">
                        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                            Add new Category
                        </h1>
                    </Modal.Header>
                    <Modal.Body className="flex justify-center items-center">
                        <form className="max-w-sm m-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categoryName"
                                >
                                    Category Name
                                </label>
                                <Controller
                                    name="categoryName"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            placeholder="Enter category name"
                                        />
                                    )}
                                />
                                {errors.categoryName && (
                                    <p className="text-red-500">{errors.categoryName.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="categoryDescription"
                                >
                                    Category Description
                                </label>
                                <Controller
                                    name="categoryDescription"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="3"
                                            placeholder="Enter description"
                                        />
                                    )}
                                />
                                {errors.categoryDescription && (
                                    <p className="text-red-500">
                                        {errors.categoryDescription.message}
                                    </p>
                                )}
                            </div>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-1 "
                                type="submit"
                            >
                                Add
                            </button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="flex justify-center items-center">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setOpenModal(false);
                                reset();
                            }}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mb-1 mr-2 "
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <div className="relative">
                <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 py-2 px-4">
                    Category
                </h1>
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                    Add Category
                </button>
            </div>

            <table className="min-w-full border-collapse m-6">
                <thead>
                    <tr>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            ID
                        </th>
                        <th className="py-2 text-left px-4 border bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Category
                        </th>
                        <th className="py-2 text-left px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm border-b">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b">{item.ID}</td>
                            <td className="py-2 px-4 border-b">{item.Name}</td>
                            <td className="py-2 px-4 border-b">{item.Description}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 mb-1"
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Category;
