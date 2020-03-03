function makeNotesArray() {
    return [
        {
            id: 1,
            title: 'Note1',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 1
        },
        {
            id: 2,
            title: 'Note2',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 2
        },
        {
            id: 3,
            title: 'Note3',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 2
        },
        {
            id: 4,
            title: 'Note4',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
        {
            id: 5,
            title: 'Note5',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
        {
            id: 6,
            title: 'Note6',
            date_modified: Date.now(),
            content: 'asdfasfafds',
            folderid: 3
        },
    ]
}

module.exports = {
    makeNotesArray,
}