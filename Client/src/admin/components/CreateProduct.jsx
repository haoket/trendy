import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { createProduct, updateProduct } from "../../utils/apiCalls";
import { getCategory } from "../../utils/apiCalls"; // Import the function to fetch categories

const ProductForm = () => {
    const schema = yup.object().shape({
        Name: yup.string().required("Name is required"),
        Description: yup.string().required("Description is required"),
        Price: yup.string().required("Price is required"),
        Category: yup.string().required("Category is required"),
        Stars: yup.string().required("Price is required"),
        Quantity: yup.string().required("Quantity is required"),

    });

    const [categories, setCategories] = useState([]); // State to store categories
    const {
        register,
        handleSubmit,
        formState: { errors },
        control, // Add control from react-hook-form
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        // Fetch categories when the component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await getCategory(); // Fetch categories from your API
            setCategories(result); // Update the categories state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        formData.append("Price", data.Price);
        formData.append("Category", data.Category);
        formData.append("Stars", data.Stars);
        formData.append("Quantity", data.Quantity);
        formData.append("ImageLink", data.ImageLink); // Lấy tệp hình ảnh đầu tiên từ input file


        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        // Gọi hàm createProduct với FormData
        await createProduct(formData);
        // createProduct(data);
    };

    return (
        <form className="max-w-sm m-6" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productName"
                >
                    Product Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productName"
                    type="text"
                    placeholder="Enter product name"
                    required="required"
                    {...register("Name")}
                />
            </div>
            <p className="error">{errors.Name?.message}</p>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    rows="3"
                    placeholder="Enter description"
                    required="required"
                    {...register("Description")}
                />
            </div>
            <p className="error">{errors.Description?.message}</p>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                >
                    Price
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    required="required"
                    {...register("Price")}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="quantity"
                >
                    Quantity
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity"
                    type="number"
                    placeholder="Enter price"
                    required="required"
                    {...register("Quantity")}
                />
            </div>
            <p className="error">{errors.Price?.message}</p>

            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                >
                    Category
                </label>
                <Controller
                    name="Category"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.Name}>
                                    {category.Name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>
            <p className="error">{errors.Category?.message}</p>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="stars"
                >
                    Stars
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stars"
                    type="number"
                    placeholder="Enter price"
                    required="required"
                    {...register("Stars")}
                />



            </div>
            <p className="error">{errors.Stars?.message}</p>


            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imageLink"
                >
                    Image Link
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="imageLink"
                    accept="image/*"
                    type="file" // Sử dụng kiểu file
                    required="required"
                    {...register("ImageLink")}
                />
            </div>

            <div className="flex items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
