import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { Note } from "../models/Note";
import { Category } from "../models/Category";

// Get all notes
export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find().populate("category");
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id).populate("category");
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Get notes by category ID
export const getNotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return next(new AppError("Category not found", 404));
    }

    const notes = await Note.find({ category: categoryId }).populate("category");
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category } = req.body;
    
    if (!title || !content || !category) {
      return next(new AppError("Title, content, and category are required", 400));
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return next(new AppError("Invalid category ID", 400));
    }

    const note = await Note.create({ title, content, category });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return next(new AppError("Invalid category ID", 400));
      }
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
