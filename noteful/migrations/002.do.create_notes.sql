CREATE TABLE notes_table (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    date_modified TIMESTAMPTZ NOT NULL,
    content TEXT,
    folderId INTEGER REFERENCES folders_table(id) ON DELETE CASCADE NOT NULL
);