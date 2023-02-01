import express from "express";
import CategoryController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .get("/categories", CategoryController.getCategories)
  .post("/categories", CategoryController.insertCategory)
  .get("/categories/:id", CategoryController.getCategoryById)

export default router; 