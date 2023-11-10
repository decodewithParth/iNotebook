const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const { Error } = require('mongoose');

//Route 1: Get all the notes using GET "/api/notes/fetchallnotes"  , Login requires
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2: Add a new note using GET "/api/notes/addnote"  , login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charactors').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors then retuen bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
})


//Route 3: Update an existing node using PUT "/api/notes/updatenote"  , login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        // Creating newNote object 
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//Route 4: Delete an existing node using DELETE "/api/notes/deletenote"  , login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };

    // Allow deletion only if user own this note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });
})
module.exports = router