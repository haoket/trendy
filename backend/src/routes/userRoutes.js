import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateImage
} from '../controllers/userControllers.js';

const userRoutes = (app) => {
  app.route('/users')
    .get(getUsers)
    .post(createUser);

  app.route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
  app.route('/users/update/:id').put(updateImage);
};

export default userRoutes;
