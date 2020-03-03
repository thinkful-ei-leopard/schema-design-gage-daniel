'use strict'

const NotesService = {
    getAllNotes(knex) {
        return knex
            .from('notes_table')
            .select('*');
    },
    getById(knex, id) {
        return knex
            .from('notes_table')
            .select('*')
            .where({ id })
            .first();
    },
    getByFolderId(knex, FolderId) {
        return knex
            .from('notes_table')
            .select('*')
            .where('FolderId', FolderId)
    },
    insertNote(knex, newNote) {
        return knex
            .from('notes_table')
            .insert(newNote)
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    deleteNote(knex, id) {
        return knex
            .from('notes_table')
            .where({ id })
            .delete();
    },
    updateNote(knex, id, newNoteData) {
        return knex
            .from('notes_table')
            .where({ id })
            .update(newNoteData)
    }   
};

module.exports = NotesService;