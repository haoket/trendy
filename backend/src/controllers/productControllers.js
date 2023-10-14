
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();
// Create a new product
export const createProduct = (req, res) => {
  const { Name, Description, Price, Quantity, Category, Manufacturer, Stars } = req.body;


  // Kiểm tra xem tệp hình ảnh đã tải lên thành công chưa
  if (!req.file) {
    return res.status(400).json({ error: 'Tệp hình ảnh không được gửi' });
  }

  const ImageLink = req.file.filename; // Lấy tên tệp hình ảnh đã tải lên

  const query = 'INSERT INTO Products (Name, Description, Price, Quantity, Category, Manufacturer, Stars, ImageLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, Manufacturer, Stars, ImageLink], (error) => {
    if (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi tạo sản phẩm' });
    } else {
      res.status(201).json({ message: 'Sản phẩm được tạo thành công' });
    }
  });
};

// Update a product
export const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { Name, Description, Price, Quantity, Category, Manufacturer } = req.body;

  const query = 'UPDATE Products SET Name = ?, Description = ?, Price = ?, Quantity = ?, Category = ?, Manufacturer = ? WHERE ID = ?';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, Manufacturer, productId], (error) => {
    if (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    } else {
      res.status(200).json({ message: 'Sản phẩm được cập nhật thành công' });
    }
  });
};




export const getProductById = (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM Products WHERE ID = ?';

  dbConnection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Sản phẩm không được tìm thấy' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};




// Delete a product
export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM Products WHERE ID = ?';

  dbConnection.query(query, [productId], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Sản phẩm không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
      }
    }
  });
};
export const getProducts = (req, res) => {
  const query = 'SELECT * FROM Products';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    } else {
      res.status(200).json(results);
    }
  });
};