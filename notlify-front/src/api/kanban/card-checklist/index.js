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

		const [section, card] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					const section = card.checklist.find((section) => section.id === sectionItemId);

					if (section) {
						return [section, card];
					}
				}
			}
		})();

		section.rows.push(row);
		
		save(data);
	}

	static updateSectionChecklist(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItemId = detail.sectionItemId;
		const rowDetail = detail.row;
		const param = detail.param;

		const [row, section] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					const section = card.checklist.find((section) => section.id === sectionItemId);

					if (section) {
						const row = section.rows.find((row) => row.id === rowDetail.id);

						return [row, section];
					}
				}
			}
		})();
		switch (param) {
			case "completed":
				row.completed = !rowDetail.completed;
				break;
			case "name":
				row.name = rowDetail.name;
				break;
			case "priority":
				row.priority = rowDetail.priority;
				break;
			case "reminder":
				row.reminder = rowDetail.reminder;
				break;
		}

		save(data);
	}

	static deleteSectionChecklist(detail) {
		const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const sectionItemId = detail.sectionItemId;
		const rowId = detail.rowId;

		const [section, card] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					const section = card.checklist.find((section) => section.id === sectionItemId);

					return [section, card];
				}
			}
		})();
		section.rows = section.rows.filter(row => row.id !== rowId);

		save(data);
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
