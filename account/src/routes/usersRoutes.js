import express from 'express';
import UserController from '../controllers/usersController.js';

const router = express.Router();

router
  .get('/admin/users', UserController.getUsers)
  .get('/users/:id', UserController.getUserById)
  .post('/admin/users', UserController.insertUser)
  .put('/admin/users/:id', UserController.updateUser)
  .delete('/admin/users/:id', UserController.deleteUser);

export default router;
