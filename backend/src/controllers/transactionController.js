import mysql from 'mysql';
import createDatabaseConnection from '../config/database.js';

const dbConnection = createDatabaseConnection();

// Get all Transactions
export const getLatestTransactions = async (req, res) => {
    try {
        const result = await dbConnection.query('SELECT * FROM Payment ORDER BY date DESC');

        if (!result || !result.length) {
            res.status(404).json({ message: 'Orders not found' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
};

export const getUserOrders = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await dbConnection.query(
            'SELECT order_id, email, productName, status FROM Payment WHERE user_id = ? ORDER BY date DESC',
            [user_id]
        );

        if (!result || !result.length) {
            res.status(404).json({ message: 'You have not made any orders yet' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving orders' });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await dbConnection.query('DELETE FROM Payment WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while cancelling an order' });
    }
};

export const updateOrder = async (req, res) => {
    const { order_id } = req.params;
    const { status } = req.body;

    try {
        await dbConnection.query('UPDATE Payment SET status = ? WHERE order_id = ?', [status, order_id]);
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating status' });
    }
};
