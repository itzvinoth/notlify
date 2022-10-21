export default class CardChecklistApi {
	static addCardSection(detail) {
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

		card.checklist.push(item);

		save(data);
	}

	static deleteCardSection(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItem = detail.item;

		const [card, currentColumn] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					return [card, column];
				}
			}
		})();
		card.checklist = card.checklist.filter(checklist => checklist.id !== sectionItem.id);
		
		save(data);
	}

	static addSectionChecklist(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItemId = detail.sectionItemId;
		const row = detail.row;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < columns[i].cards.length; j++) {
				let card = columns[i].cards[j];
				for (let k = 0; k < card.checklist.length; k++) {
					let section = columns[i].cards[j].checklist[k];
					if (section.id === sectionItemId) {
						let s = section.rows || [];
						s.push(row);
						section.rows = s;
					}
				}
			}
			cols.push(column);
		}
		save(cols);
		return cols;
	}

	static updateSectionChecklist(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItemId = detail.sectionItemId;
		const row = detail.row;
		const param = detail.param;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < columns[i].cards.length; j++) {
				let card = columns[i].cards[j];
				for (let k = 0; k < card.checklist.length; k++) {
					let section = columns[i].cards[j].checklist[k];
					if (section.id === sectionItemId) {
						let rows = section.rows || [];
						for (let l = 0; l < rows.length; l++) {
							if (rows[l].id === row.id) {
								if (param === "completed") {
									rows[l].completed = !rows[l].completed;
								} else if (param === "name") {
									rows[l].name = row.name;
								} else if (param === "priority") {
									rows[l].priority = row.priority;
								} else if (param === "reminder") {
									rows[l].reminder = row.reminder;
								}
							}
						}
						section.rows = rows;
					}
				}
			}
			cols.push(column);
		}
		save(cols);
		return cols;
	}

	static deleteSectionChecklist(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItemId = detail.sectionItemId;
		const rowId = detail.rowId;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < columns[i].cards.length; j++) {
				let card = columns[i].cards[j];
				for (let k = 0; k < card.checklist.length; k++) {
					let section = columns[i].cards[j].checklist[k];
					if (section.id === sectionItemId) {
						let rows = section.rows || [];
						for (let l = 0; l < rows.length; l++) {
							if (rows[l].id === rowId) {
								rows.splice(l, 1);
							}
						}
						section.rows = rows;
					}
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
