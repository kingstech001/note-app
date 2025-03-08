import { Request, Response, NextFunction } from "express";
import Note from "../models/Note";
import AppError from "../utils/AppError";

// Get all notes
export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return next(new AppError("Title and content are required", 400));
    }
    const note = await Note.create({ title, content });
    res.status(201).json(note);
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
