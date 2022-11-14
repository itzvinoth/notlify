export default class CardTagsApi {
	static addCardTag(detail) {
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

		card.tags.push(item);

		save(data);
    }

    static updateCardTag(detail) {
        const data = read();
		const columns = data;

		const cardId = detail.cardId;
		const item = detail.item;
        const tagItemId = item.id;

        const [tag, card] = (() => {
			for (const column of columns) {
				const card = column.cards.find((card) => card.id === cardId);

				if (card) {
                    const tag = card.tags.find((tag) => tag.id === tagItemId);

                    if (tag) {
                        return [tag, card];
                    }
				}
			}
		})();
        tag.name = item.name;
        tag.color = item.color;

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
