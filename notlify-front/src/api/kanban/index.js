export default class KanbanApi {
	static insertColumn(newProps) {
		const data = read();
		const columns = data;

		if (!columns) {
			return [];
		}

		columns.push(newProps);
		save(data);

		return columns;
	}

	static deleteColumn(columnId) {
		const data = read();
		const columns = data;

		const column = columns.find((column) => column.id == columnId);

		if (column) {
			columns.splice(columns.indexOf(column), 1);
		}

		save(data);
	}

	static getCards(columnId) {
		const column = read().find((column) => column.id === columnId);
		if (!column) {
			return [];
		}
		return column.cards;
	}

	static insertCard(columnId, cardId) {
		const data = read();
		const column = data.find((column) => column.id === columnId);
		const card = {
			id: cardId,
			checklist: [],
			description: {
				content: "",
			}
		};

		if (!column) {
			throw new Error("Column not exists");
		}

		column.cards.push(card);
		save(data);

		return card;
	}

	static updateCard(cardId, newProps) {
		const data = read();

		const [card, currentColumn] = (() => {
			for (const column of data) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
					return [card, column];
				}
			}
		})();

		if (!card) {
			throw new Error("Card not exists");
		}

		card.title = newProps.title === undefined ? card.title : newProps.title;
		card.color = newProps.color === undefined ? card.color : newProps.color;
		card.checklist =
			newProps.checklist && newProps.checklist.length < 1
				? card.checklist
				: newProps.checklist;

		// update column and position
		if (
			newProps.columnId !== undefined &&
			newProps.position !== undefined
		) {
			const targetColumn = data.find(
				(column) => column.id == newProps.columnId
			);

			if (!targetColumn) {
				throw new Error("Target column not found.");
			}

			// Delete the card from it's current column
			currentColumn.cards.splice(currentColumn.cards.indexOf(card), 1);

			// Move card into it's new column and position
			targetColumn.cards.splice(newProps.position, 0, card);
		}

		save(data);
	}

	static deleteCard(cardId) {
		const data = read();

		for (const column of data) {
			const card = column.cards.find((card) => card.id == cardId);

			if (card) {
				column.cards.splice(column.cards.indexOf(card), 1);
			}
		}

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
