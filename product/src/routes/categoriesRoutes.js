import express from 'express';
import CategoryController from '../controllers/categoriesController.js';
import { bearerStrategyAuth } from '../authorization/bearerEstrategia.js';

const router = express.Router();

router
  .get('/categories', CategoryController.getCategories)
  .get('/categories/:id', CategoryController.getCategoryById)
  .post('/admin/categories', bearerStrategyAuth, CategoryController.insertCategory)
  .put('/admin/categories/:id', bearerStrategyAuth, CategoryController.updateCategory)
  .delete('/admin/categories/:id', bearerStrategyAuth, CategoryController.deleteCategory)
  .patch('/admin/categories/:id', bearerStrategyAuth, CategoryController.updateStatusCategory);

export default router;
