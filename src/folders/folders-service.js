'use strict';

const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('folders_table');
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('folders_table')
            .where('id', id)
            .first();
    },
    insertFolder(knex, newFolder) {
        return knex
            .from('folders_table')
            .insert(newFolder)
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    deleteFolder(knex, id) {
        return knex
            .from('folders_table')
            .where({ id })
            .delete();
    },
    updateFolder(knex, id, newFolderData) {
        return knex 
            .from('folders_table')
            .where({ id })
            .update(newFolderData);
    }
};

module.exports = FoldersService;