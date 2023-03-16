import express from 'express';
import ProductController from '../controllers/productsController.js';
import { bearerStrategyAuth } from '../authorization/bearerEstrategia.js';

const router = express.Router();

router
  .get('/products', ProductController.getProducts)
  .get('/products/:id', ProductController.getProductById)
  .post('/admin/products', bearerStrategyAuth, ProductController.insertproduct)
  .put('/admin/products/:id', bearerStrategyAuth, ProductController.updateProduct)
  .delete('/admin/products/:id', bearerStrategyAuth, ProductController.deleteProduct);

export default router;
