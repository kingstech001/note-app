"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNoteById = exports.getNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const AppError_1 = __importDefault(require("../utils/AppError"));
// Get all notes
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.default.find();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
// Get a single note by ID
const getNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.default.findById(req.params.id);
        if (!note) {
            return next(new AppError_1.default("Note not found", 404));
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteById = getNoteById;
// Create a new note
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return next(new AppError_1.default("Title and content are required", 400));
        }
        const note = yield Note_1.default.create({ title, content });
        res.status(201).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
// Delete a note
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.default.findByIdAndDelete(req.params.id);
        if (!note) {
            return next(new AppError_1.default("Note not found", 404));
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
