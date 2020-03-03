const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeNotesArray } = require('./notes.fixtures');
const { makeFoldersArray } = require('./folders.fixtures');

describe('Notes endpoints', () => {
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

    describe.only('/', () => {
        context('if no notes are present', () => {
            it('returns 200 and an empty notes array', () => {
            return supertest(app)
                .get('/')
                .expect(200, [])
            })
        })
        context('given notes in the database notes table', () => {
            const testNotesArray = makeNotesArray();
            const testFoldersArray = makeFoldersArray();

            beforeEach('insert folders', () => {
                return db('folders_table')
                    .insert(testFoldersArray)
                    .then(() => {
                        return db 
                            .into('notes_table')
                            .insert(testNotesArray)
                    })
            })

            it('returns 200 and test notes array', () => {
               return supertest(app)
                 .get('/')
                 .expect(200, testNotesArray)
                 .then(res => console.log(res))
            })
        })
    })
})