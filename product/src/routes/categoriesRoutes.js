import express from "express";
import CategoryController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .get("/categories", CategoryController.getCategories)
  .post("/categories", CategoryController.insertCategory)
  .get("/categories/:id", CategoryController.getCategoryById)
  .put("/categories/:id", CategoryController.updateCategory)
  .delete("/categories/:id", CategoryController.deleteCategory)
  .patch("/categories/:id", CategoryController.updateStatusCategory)

export default router; 