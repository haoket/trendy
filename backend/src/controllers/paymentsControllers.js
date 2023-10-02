import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();

// Get all payments
export const getPayments = (req, res) => {
  const query = 'SELECT * FROM Payments';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách thanh toán:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách thanh toán' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single payment by ID
export const getPaymentById = (req, res) => {
  const paymentId = req.params.id;
  const query = 'SELECT * FROM Payments WHERE ID = ?';

  dbConnection.query(query, [paymentId], (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy thông tin thanh toán:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin thanh toán' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Thanh toán không được tìm thấy' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
};

// Create a new payment
export const createPayment = (req, res) => {
  const { OrderID, Amount, PaymentDate } = req.body;
  const query = 'INSERT INTO Payments (OrderID, Amount, PaymentDate) VALUES (?, ?, ?)';

  dbConnection.query(query, [OrderID, Amount, PaymentDate], (error) => {
    if (error) {
      console.error('Lỗi khi tạo thanh toán:', error);
      res.status(500).json({ error: 'Lỗi khi tạo thanh toán' });
    } else {
      res.status(201).json({ message: 'Thanh toán được tạo thành công' });
    }
  });
};

// Update a payment
export const updatePayment = (req, res) => {
  const paymentId = req.params.id;
  const { OrderID, Amount, PaymentDate } = req.body;
  const query = 'UPDATE Payments SET OrderID = ?, Amount = ?, PaymentDate = ? WHERE ID = ?';

  dbConnection.query(query, [OrderID, Amount, PaymentDate, paymentId], (error, result) => {
    if (error) {
      console.error('Lỗi khi cập nhật thanh toán:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật thanh toán' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Thanh toán không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Thanh toán được cập nhật thành công' });
      }
    }
  });
};

// Delete a payment
export const deletePayment = (req, res) => {
  const paymentId = req.params.id;
  const query = 'DELETE FROM Payments WHERE ID = ?';

  dbConnection.query(query, [paymentId], (error, result) => {
    if (error) {
      console.error('Lỗi khi xóa thanh toán:', error);
      res.status(500).json({ error: 'Lỗi khi xóa thanh toán' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Thanh toán không được tìm thấy' });
      } else {
        res.status(200).json({ message: 'Thanh toán đã được xóa thành công' });
      }
    }
  });
};

// Đảm bảo đóng kết nối sau khi xử lý xong các yêu cầu
process.on('exit', () => {
  dbConnection.end();
});
