import express from "express";
import {
  getNotes,
  getNoteById,
  getNotesByCategory,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { validateNote } from "../middlewares/validateNote";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.get("/categories/:categoryId", getNotesByCategory);
router.post("/", validateNote, createNote);
router.put("/:id", validateNote, updateNote);
router.delete("/:id", deleteNote);

export default router;
