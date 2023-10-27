
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();
// Create a new product
export const createProduct = (req, res) => {
  console.log('====================================');
  console.log("req", req.body);
  console.log('====================================');
  const { Name, Description, Price, Quantity, Category, Stars, ImageLink } = req.body;
  const imageLinkJSON = JSON.stringify(ImageLink);

  const query = 'INSERT INTO Products (Name, Description, Price, Quantity, Category, Stars, ImageLink) VALUES (?, ?, ?,?, ?, ?, ?)';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, Stars, imageLinkJSON], (error) => {
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
  console.log('====================================');
  console.log("req", req.body);
  console.log('====================================');
  const productId = req.params.id;
  const { Name, Description, Price, Quantity, Category, ImageLink } = req.body;
  const imageLinkJSON = JSON.stringify(ImageLink);
  const query = 'UPDATE Products SET Name = ?, Description = ?, Price = ?, Quantity = ?, Category = ?, ImageLink = ? WHERE ID = ?';

  dbConnection.query(query, [Name, Description, Price, Quantity, Category, imageLinkJSON, productId], (error) => {
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

export const getAllProduct = (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM Products';
  dbConnection.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Sản phẩm không được tìm thấyaâa' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};
export const getProductsByCategory = async (req, res) => {
  const productSlug = req.params.slug;

  // Tìm tên danh mục (category) bằng slug
  dbConnection.query('SELECT Name FROM categories WHERE slug = ?', [productSlug], (error, categoryResults) => {
    if (error) {
      console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin danh mục' });
    } else {
      if (categoryResults.length === 0) {
        res.status(404).json({ message: 'Danh mục không được tìm thấy' });
        return;
      }

      const categoryName = categoryResults[0].Name;

      // Tìm danh sách sản phẩm bằng tên danh mục
      dbConnection.query('SELECT * FROM products WHERE category = ?', [categoryName], (error, productResults) => {
        if (error) {
          console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
          res.status(500).json({ error: 'Lỗi khi lấy thông tin sản phẩm' });
        } else {

          res.status(200).json(productResults);

        }
      });
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



export const uploadImage = (req, res) => {
  if (req.file) {
    const uploadedImageName = req.file.filename;
    console.log('====================================');
    console.log(uploadedImageName);
    console.log('====================================');
    res.json({ fileName: uploadedImageName });
  } else {
    res.status(400).send('Không có hình ảnh được tải lên.');
  }
}