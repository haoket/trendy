import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';
const dbConnection = createDatabaseConnection();

// Get all users
// export const getUsers = async (req, res) => {
//   try {
//     const result = await dbConnection.query('SELECT * FROM Users');
//     if (!result || !result.length) {
//       res.status(404).json({ message: 'Users not found' });
//     } else {
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: `An error occurred while retrieving users... ${error.message}` });
//   }
// };

export const getUsers = (req, res) => {
  const query = 'SELECT * FROM Users';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    } else {
      res.status(200).json(results);
    }
  });
};




// Get a specific user by ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await dbConnection.query('SELECT * FROM Users WHERE id = ?', [userId]);

    if (!result || !result.length) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while retrieving the user... ${error.message}` });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { password, email, phone, name, address } = req.body;
  console.log('====================================');
  console.log('req', req.body);
  console.log('====================================');
  const created_at = new Date().toDateString();
  try {
    dbConnection.query('INSERT INTO Users (name, address, phone, password, email, created_at) VALUES (?, ?, ?,?,?,?)', [name, address, phone, password, email, created_at]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while creating the user... ${error.message}` });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { password, email } = req.body;

  try {
    await dbConnection.query('UPDATE Users SET password = ?, email = ? WHERE id = ?', [password, email, userId]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while updating the user... ${error.message}` });
  }
};

export const updateImage = async (req, res) => {
  const userId = req.params.id;
  console.log('====================================');
  console.log('req', req.body);
  console.log('====================================');
  const { uploadImage } = req.body;

  try {
    dbConnection.query('UPDATE users SET img = ? WHERE id = ?', [uploadImage, userId]);
    res.status(200).json({ message: 'User image update successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while updating the user Image... ${error.message}` });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await dbConnection.query('DELETE FROM Users WHERE id = ?', [userId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `An error occurred while deleting the user... ${error.message}` });
  }
};
