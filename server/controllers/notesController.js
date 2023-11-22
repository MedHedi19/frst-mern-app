const Note = require("../models/note");

const fetchNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({ notes });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
};

const fetchNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        return res.status(200).json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
};

const createNote = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (
            !body ||
            !title
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, body',
            });
        }
        const note = await Note.create({
            title,
            body,
        });
        res.status(201).json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (
            !title ||
            !body
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, body',
            });
        }
        const noteId = req.params.id;
        const result = await Note.findByIdAndUpdate(noteId, {
            title,
            body
        });
        if (!result) {
            return res.status(404).json({ message: 'note not found' });
        }
        return res.status(200).json({ result });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const result = await Note.findByIdAndDelete(noteId);
        if (!result) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).send({ message: 'Note deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: message.err });
    }
};


module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
};
