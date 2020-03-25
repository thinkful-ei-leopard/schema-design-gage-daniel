const express = require('express')
const FoldersService = require('./folders-service')
const xss = require ('xss')
const path = require('path')

const foldersRouter = express.Router()
const bodyParser = express.json()

foldersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders);
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { name } = req.body;
        const newFolder = {name};
        if(!name) {
          return res
            .status(400)
            .send('Invalid data')  
        }
        FoldersService.insertFolder(req.app.get('db'), newFolder)
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json(folder)
            })
            .catch(next)
    });

    foldersRouter
        .route('/:id')
        .get((req, res, next) => {
            const knexInstance = req.app.get('db')
            FoldersService.getById(knexInstance, req.params.id)
                .then(folder => {
                    if(!folder) {
                        return res.status(404).json({
                            error: { message: 'Folder does not exist' }
                        });
                    }
                    res.json({
                        id: folder.id,
                        name: xss(folder.name),
                    })
                })
                .catch(next);
        })
        .delete((req, res, next) => {
            const knexInstance = req.app.get('db');
            FoldersService.deleteFolder(knexInstance, req.params.id)
                .then(folder => {
                    if(!folder) {
                        return res.status(404).json({
                            error: { message: 'Folder does not exist' }
                        });
                    }
                    res
                        .status(204)
                        .end()
                })
                .catch(next)
        })

        module.exports = foldersRouter;
    