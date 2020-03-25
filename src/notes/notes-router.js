const express = require('express')
const NotesService = require('./notes-service')
const xss = require ('xss')
const path = require('path')

const notesRouter = express.Router()
const bodyParser = express.json()

notesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getAllNotes(knexInstance)
            .then(notes => {
                res.json(notes);
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { name, content, folderid } = req.body;
        const newNote = { name, content, folderid: folderid };
        if(!name || !folderid) {
            return res
                .status(400)
                .send('Invalid data');
        }
        NotesService.insertNote(req.app.get('db'), newNote)
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(note)
            })
            .catch(next)
    });

notesRouter
    .route('/:noteId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getNoteById(knexInstance, req.params.noteId)
            .then(note => {
                res.json(note)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.deleteNote(knexInstance, req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).json({
                  error: { message: `note doesn't exist`}
                });
              }
            res
              .status(204)
              .send('deleted');
        })
        .catch(next)
    })
notesRouter
    .route('/:folderId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getByFolderId(knexInstance, req.params.noteId)
        .then(notes => {
            res.json(notes)
        })
        .catch(next)
    })

    module.exports = notesRouter;