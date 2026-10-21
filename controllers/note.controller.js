import { Note } from "../models/note.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const data = await Note.find({ user: req.user });
    if (!data) {
      return res.status(404).json({ message: "Notes Not Found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (
      !title ||
      !message ||
      title.trim().length === 0 ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ message: "Please add the valid data (fields cannot be empty or just spaces)" });
    }
    const note = await Note.create({ title: title.trim(), message: message.trim(), user: req.user });
    return res.status(201).json({ message: "Data Created", note });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const id = req.query.id;
    if(!id) {
      return res.status(404).json({message: "Note not found"})
    }
    const note = await Note.findById(id);
    return res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.query.id;
    if(!id) {
      return res.status(404).json({message: "Note not found"})
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ message: "Note Updated!", updatedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.query.id;
    if(!id) {
      return res.status(404).json({message: "Note not found"})
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note Deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
