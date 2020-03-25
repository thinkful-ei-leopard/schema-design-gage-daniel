function makeNotesArray() {
    return [
        {
            id: 1,
            name: 'Note1',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 1
        },
        {
            id: 2,
            name: 'Note2',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 2
        },
        {
            id: 3,
            name: 'Note3',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 2
        },
        {
            id: 4,
            name: 'Note4',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
        {
            id: 5,
            name: 'Note5',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
        {
            id: 6,
            name: 'Note6',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
    ]
}

module.exports = {
    makeNotesArray,
}