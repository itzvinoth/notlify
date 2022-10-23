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

	static updateCardNote(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const item = detail.item;

		const [note, card] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					const note = card.notes.find((note) => note.id === item.id);

					if (note) {
						console.log("note: ", note);
						return [note, card];
					}
				}
			}
		})();

		note.title = item.title;
		note.body = item.body;
		note.updated = item.updated;

		save(data);
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
