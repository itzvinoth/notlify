export default class CardChecklistApi {
	static addCardSection(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const item = detail.item;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < column.cards.length; j++) {
				let card = column.cards[j];
				if (card.id === cardId) {
					let c = card.checklist || [];
					c.push(item);
					card.checklist = c;
				}
			}
			cols.push(column);
		}
		save(cols);
		return cols;
	}

	static deleteCardSection(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItem = detail.item;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			for (let j = 0; j < column.cards.length; j++) {
				let card = columns[i].cards[j];
				let newChecklist = [];
				for (let k = 0; k < card.checklist.length; k++) {
					let section = card.checklist[k];
					if (section.id !== sectionItem.id) {
						newChecklist.push(section);
					}
				}
				card.checklist = newChecklist;
			}
			cols.push(column);
		}
		save(cols);
		return cols;
	}

	static addSectionChecklist(cardId, sectionItemId, row) {
		const data = read();
		const columns = data;

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

	static updateSectionChecklist(cardId, sectionItemId, row, param) {
		const data = read();
		const columns = data;

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

	static deleteSectionChecklist(cardId, sectionItemId, rowId) {
		const data = read();
		const columns = data;

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
