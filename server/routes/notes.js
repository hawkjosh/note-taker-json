const notes = require('express').Router()
const { readNote, writeNote, updateNote } = require('../helpers/fsUtilities.js')
const { v4: uuidv4 } = require('uuid')

// Route for retrieving all notes
notes.get('/get', (req, res) => {
	readNote('db.json').then((data) => res.json(JSON.parse(data)))
})

// Route for posting new note
notes.post('/post', (req, res) => {
	const { title, text } = req.body
	if (req.body) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		}
		const noteId = req.params.id
		updateNote(newNote, 'db.json')
		res.json(`New note ${noteId} has been posted.`)
	}
})

// Route for deleting existing note
notes.delete('/delete/:id', (req, res) => {
	const noteId = req.params.id
  const notes = JSON.parse(data)
	readNote('db.json').then((data) => res.json(notes))
		.then((json) => {
			const result = json.filter((note) => note.id !== noteId)
			writeNote('db.json', result)
			res.json(`Note ${noteId} has been deleted.`)
		})
})

module.exports = notes
