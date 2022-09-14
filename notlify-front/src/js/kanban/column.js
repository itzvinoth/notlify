function updateColumnTitle(columns, updatedColumn) {
    let cols = [];
	for (let i = 0; i < columns.length; i++) {
		let column = columns[i];
        if (column.id === updatedColumn.id) {
            column = updatedColumn;
        }
		cols.push(column);
	}
	return cols;
}

export {
	updateColumnTitle,
};