export default class CardDescriptionApi {
	static updateCardDescription(detail) {
		const data = read();
		const columns = data;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < columns[i].cards.length; j++) {
				let card = columns[i].cards[j];
				if (card.id === detail.cardId) {
					card.description = detail.description
				}
			}
			cols.push(column);
		}
		save(cols);
		return cols;
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