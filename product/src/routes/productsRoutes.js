import express from "express";
import ProductController from "../controllers/productsController.js";
const router = express.Router();

router
  .get("/products", ProductController.getProducts)
  .get("/products/:id", ProductController.getProductById)
  .post("/admin/products", ProductController.insertproduct)
  .put("/admin/products/:id", ProductController.updateProduct)
  .delete("/admin/products/:id", ProductController.deleteProduct)

export default router; 