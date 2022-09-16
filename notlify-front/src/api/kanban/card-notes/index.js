export default class NotesApi {
	static getNotes () {
		const json = localStorage.getItem('notes-data');
		if (!json) {
			return []
		}
		return JSON.parse(json);
	}

	static addNote (note) {
		const notes = NotesApi.getNotes();
		note.id = Math.floor(Math.random() * 10000000);
		note.updated = new Date().toISOString()

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