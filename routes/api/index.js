const router = require("express").Router();
const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const path = require("path")
const {v4:uuidv4} = require('uuid')

const getNotes = () => {
    return readFile("db.json", "utf-8").then(notes => [].concat(JSON.parse(notes)))
}

const saveNote = (note) => {
  return getNotes().then(notes => {
        // Assuming each note has an id and the new note already has a unique id
        const {title, text} = note;
        const noteObject = {title, text, id:uuidv4()}
        let noteArray = [...notes, noteObject]
        return writeFile("db.json", JSON.stringify(noteArray));
    }).then(() => note); // Return the newly added note
}

router.get("/notes", (req, res) => {
    // get notes for user
    getNotes().then(notes => res.json(notes)).catch(err => {
        res.status(500).send("Error reading notes");
    })
})
router.post("/notes", (req, res) => {
    // add note to db.json
    const newNote = req.body;

    if (!newNote) {
        return res.status(400).send("Note content is required");
    }

    
    // the front end automatically reroutes the get route
saveNote(newNote).then(note => res.json(note)).catch(err =>{
    res.status(500).send("Error saving note")
})

})

router.delete("/notes/:id", (req, res)=> {
    getNotes().then(oldNotes => {
        const filteredNotes = oldNotes.filter(note => note.id !== req.params.id)
        return writeFile("db.json", JSON.stringify(filteredNotes));
    }).then(() => res.json({msg:"ok"})).catch(err => res.status(500).json(err))
})


module.exports = router