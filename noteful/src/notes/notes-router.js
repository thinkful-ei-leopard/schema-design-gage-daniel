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
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.deleteNote(knexInstance, req.params.noteId)
        .then(note => {
            if(!bookmark) {
                return res.status(404).json({
                  error: { message: `bookmark doesn't exist`}
                });
              }
            res
              .status(204)
              .end();
        })
        .catch(next)
    })

notesRouter
    .route('/add-note')
    .post(bodyParser, (req, res, next) => {
        const { title, date_modified, content, folderId } = req.body;
        const newNote = { title, date_modified, content, folderId };
        if(!title || !date_modified || !folderId) {
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
    .route('/api/folder/:FolderId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.getNotesByFolderId(knexInstance, req.params.FolderId)
            .then(notes => {
                res.json(notes)
    })
    .catch(next)
})
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db');
        NotesService.deleteNote(knexInstance, req.params.noteId)
        .then(note => {
            if(!bookmark) {
                return res.status(404).json({
                  error: { message: `bookmark doesn't exist`}
                });
              }
            res
              .status(204)
              .end();
        })
        .catch(next)
    })

notesRouter
    .route('/api/note/:noteId')
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
            if(!bookmark) {
                return res.status(404).json({
                  error: { message: `bookmark doesn't exist`}
                });
              }
            res
              .status(204)
              .end();
        })
        .catch(next)
    })

    module.exports = notesRouter;