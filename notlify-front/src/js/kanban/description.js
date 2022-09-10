function updateCardDescription(columns, cardId, description) {
	let cols = [];
	for (let i = 0; i < columns.length; i++) {
		let column = columns[i];
		for (let j = 0; j < columns[i].cards.length; j++) {
			let card = columns[i].cards[j];
			if (card.id === cardId) {
				card.description = description
			}
		}
		cols.push(column);
	}
	return cols;
}

export {
	updateCardDescription,
};