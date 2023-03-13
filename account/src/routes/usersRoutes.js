import express from 'express';
import UserController from '../controllers/usersController.js';
import { localMiddlewareAut, bearerMiddlewareAut } from '../authorization/middlewareAutenticacaoUser.js';

const router = express.Router();

router
  .post('/users/login', localMiddlewareAut, UserController.loginUser)
  .get('/admin/users', bearerMiddlewareAut, UserController.getUsers)
  .get('/users/:id', bearerMiddlewareAut, UserController.getUserById)
  .post('/admin/users', UserController.insertUser)
  .put('/admin/users/:id', bearerMiddlewareAut, UserController.updateUser)
  .delete('/admin/users/:id', bearerMiddlewareAut, UserController.deleteUser);

export default router;
