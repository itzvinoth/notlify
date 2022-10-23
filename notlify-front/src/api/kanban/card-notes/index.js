export default class CardNotesApi {	
	static addCardNote(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const item = detail.item;

		const [card, currentColumn] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					return [card, column];
				}
			}
		})();

		card.notes.unshift(item);

		save(data);
	}

	static updateNote (note) {
		const notes = CardNotesApi.getNotes();
		const selectedNote = notes.find(n => n.id === note.id)
		selectedNote.title = ''
		selectedNote.body = ''
		selectedNote.updated = ''

		localStorage.setItem('notes-data', JSON.stringify(notes));
	}

	static deleteNote (id) {
		const notes = CardNotesApi.getNotes();

		const newNotes = notes.filter(note => note.id !== id)
		localStorage.setItem('notes-data', JSON.stringify(newNotes));
	}
}

function read() {
	const json = localStorage.getItem("kanban-data");
	if (!json) {
		return [
			{
				id: 1,
				title: "First column",
				cards: [],
			},
		];
	}
	return JSON.parse(json);
}

function save(data) {
	localStorage.setItem("kanban-data", JSON.stringify(data));
}
