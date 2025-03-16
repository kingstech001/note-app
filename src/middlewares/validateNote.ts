import { Request, Response, NextFunction } from "express";

export const validateNote = (req: Request, res: Response, next: NextFunction): void => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400).json({ message: "Title, content, and category are required" });
  } else {
    next();
  }
};
