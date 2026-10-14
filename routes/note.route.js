import express from "express";
import { getAllNotes, createNote, getNote, updateNote, deleteNote } from "../controllers/note.controller.js";

export const router = express.Router();


router.get('/notes', getAllNotes);
router.post('/note', createNote);
router.get('/note', getNote);
router.put('/note', updateNote);
router.delete('/note', deleteNote);