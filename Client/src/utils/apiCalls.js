import axios from "axios";
import { apiDomain } from "./utilsDomain";

//axios request to create a new product
// PRODUCTS


// CREATE
export const createProduct = async (product) => {

  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/products", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createCategory = async (categories) => {
  try {
    // axios request
    const { data } = await axios.post(apiDomain + "/categories", categories);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// export const createProduct = async (data) => {
//   const formData = new FormData();
//   formData.append("Name", data.Name);
//   formData.append("Description", data.Description);
//   formData.append("Price", data.Price);
//   formData.append("Quantity", data.Quantity);
//   formData.append("Category", data.Category);
//   formData.append("Stars", data.Stars);
//   formData.append("ImageLink", data.ImageLink[0]); // Lưu ý sử dụng [0] để lấy tệp đầu tiên nếu người dùng chọn nhiều tệp

//   try {
//     const response = await axios.post(apiDomain + "/products", formData);
//     console.log("Sản phẩm đã được tạo:", response.data);
//   } catch (error) {
//     console.error("Lỗi khi tạo sản phẩm:", error);
//   }
// };

// UPDATE
export const updateProduct = async (updatedProduct, productID) => {
  try {
    // axios request
    const { data } = await axios.put(
      apiDomain + "/products/" + productID,
      updatedProduct
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

//DELETE

export const deleteProduct = async (productID) => {
  try {
    // axios request
    const { data } = await axios.delete(apiDomain + "/products/" + productID);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCategory = async (categoriesID) => {
  try {
    // axios request
    const { data } = await axios.delete(apiDomain + "/categories/" + categoriesID);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//GETPRODUCTBYID
export const getProductById = async (productID) => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/products/" + productID);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//GETPRODUCT
export const getProducts = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/products");
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getCategory = async () => {
  try {
    // axios request
    const { data } = await axios.get(apiDomain + "/categories");
    return data;
  } catch (error) {
    console.error(error);
  }
};


// //USERS
// //GETPRODUCT
// export const getUsers = async () => {
//   try {
//     // axios request
//     const { users} = await axios.get(apiDomain + "/users");
//     return users;
//   } catch (error) {
//     console.error(error);
//   }
// };