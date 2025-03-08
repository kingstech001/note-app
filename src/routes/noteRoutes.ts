import express from "express";
import { getNotes, getNoteById, createNote, deleteNote } from "../controllers/noteController";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.delete("/:id", deleteNote);

export default router;
