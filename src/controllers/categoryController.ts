import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import AppError from "../utils/AppError"; // Ensure you have an AppError utility

// GET all categories
export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// CREATE a category
export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new AppError("Category name is required", 400));
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};
