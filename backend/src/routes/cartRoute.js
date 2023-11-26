import express from 'express';
import {
  getCart,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  deleteAllCart
} from '../controllers/cartController.js';

const cartRoutes = (app) => {
  app.route('/cart')
    .get(getCart)
    .post(createCart);

  app.route('/cart/:id')
    .get(getCartById)
    .put(updateCart)
    .delete(deleteCart);


  app.route('/delete-cart').delete(deleteAllCart);
};

export default cartRoutes;
