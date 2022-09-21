export default class ColumnApi {
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

	static updateColumn(updatedColumn) {
		const data = read();
		const columns = data;

		let cols = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			if (column.id === updatedColumn.id) {
				column = updatedColumn;
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
