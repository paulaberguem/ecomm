import express from "express";
import CategoryController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .get("/categories", CategoryController.getCategories)
  .post("/admin/categories", CategoryController.insertCategory)
  .get("/categories/:id", CategoryController.getCategoryById)
  .put("/admin/categories/:id", CategoryController.updateCategory)
  .delete("/admin/categories/:id", CategoryController.deleteCategory)
  .patch("/admin/categories/:id", CategoryController.updateStatusCategory)

export default router; 