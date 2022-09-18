export default class CardChecklistApi {
	static addCardSection(columns, cardId, item) {
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
		return cols;
	}

	static deleteCardSection(columns, cardId, sectionItem) {
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
		return cols;
	}

	static addSectionChecklist(columns, cardId, sectionItemId, row) {
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
		return cols;
	}

	static updateSectionChecklist(columns, cardId, sectionItemId, row, param) {
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
		return cols;
	}

	static deleteSectionChecklist(columns, cardId, sectionItemId, rowId) {
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
		return cols;
	}    
}