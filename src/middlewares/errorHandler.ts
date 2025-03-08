import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
};
