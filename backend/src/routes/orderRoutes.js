import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderItem,
  getOrderByStatus,
  updateStatusOrder,
  getAllOrder
} from '../controllers/ordersControllers.js';

const orderRoutes = (app) => {
  app.route('/create-order').post(createOrder);
  app.route('/create-order-item').post(createOrderItem);


  app.route('/orders/:id')
    .get(getOrderById)

  app.route('/update-orders-status/:id').put(updateStatusOrder)


  app.route('/getOrderByStatus').get(getOrderByStatus);

  app.route('/getAllOrders').get(getAllOrder);
};

export default orderRoutes;
