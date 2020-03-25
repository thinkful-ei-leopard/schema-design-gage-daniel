require('dotenv').config();
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeFoldersArray } = require('./folders.fixtures');
const { makeNotesArray } = require('./notes.fixtures')

describe('Folders endpoints', () => {
    let db;

    before('make knex instance', () => {
        db=knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
        app.set('db', db);
    });

    before('clean the table', () => db.raw('TRUNCATE folders_table, notes_table RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE folders_table, notes_table RESTART IDENTITY CASCADE'))

    after(() => db.destroy());

    describe('GET /', () => {
        context('with no data', () => {
            it('responds with 200 and empty folders list', () => {
                return supertest(app)
                    .get('/')
                    .expect(200, [])
            });
        });
        context('given folders_table has data', () => {
            const testFoldersArray = makeFoldersArray();
            beforeEach(() => {
                return db('folders_table')
                    .insert(testFoldersArray);
            });
            it('responds with 200 and test folders', () => {
                return supertest(app)
                    .get('/')
                    .expect(200, testFoldersArray)
            });
        });
    });

    describe('GET /folder/:folderId', () => {
        context('with no data', () => {
            it('responds with 200 and empty folders list', () => {
                return supertest(app)
                    .get('/')
                    .expect(200, [])
            });
        });
        context('given folders_table has data', () => {
            const folderId=2;
            const testFoldersArray = makeFoldersArray();
            const expectedFolder = testFoldersArray[folderId - 1];
            beforeEach(() => {
                return db('folders_table')
                    .insert(testFoldersArray);
            });
            it('responds with 200 and test folders', () => {
                return supertest(app)
                    .get(`/api/folder/${folderId}`)
                    .expect(200, expectedFolder)
            });
        });
    })

    describe('POST /add-folder', () => {
        it('creates a new folder, responding with a 201 and a new folder', () => {
            const newFolder = {
                name: 'NewFolder'
            };
            return supertest(app)
                .post('/api/add-folder')
                .send(newFolder)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.name).to.eql(newFolder.name)
                })
                .then(res => {
                    supertest(app)
                        .get(`/api/folder/${res.body.id}`)
                        .expect(res.body)
                })
        });
        it('responds with 400 when no name', () => {
            const newFolder = {
                name: null,
            };
            return supertest(app)
                .post('/api/add-folder')
                .send(newFolder)
                .expect(400)
        })
    })

})