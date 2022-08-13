export default class NotesApi {
    static getNotes () {
        const notes = NotesApi.getNotes();
        localStorage.setItem('notes-data', JSON.stringify(notes));
    }

    static addNote (note) {
        const notes = NotesApi.getNotes();

        notes.push(note);
        localStorage.setItem('notes-data', JSON.stringify(notes));
    }

    static updateNote (note) {
        const notes = NotesApi.getNotes();
        const selectedNote = notes.find(n => n.id === note.id)
        selectedNote.title = ''
        selectedNote.body = ''
        selectedNote.updated = ''

        localStorage.setItem('notes-data', JSON.stringify(notes));
    }

    static deleteNote (id) {
        const notes = NotesApi.getNotes();

        const newNotes = notes.filter(note => note.id !== id)
        localStorage.setItem('notes-data', JSON.stringify(newNotes));
    }
}