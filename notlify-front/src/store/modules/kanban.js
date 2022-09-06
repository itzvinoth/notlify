function addCardSection(columns, cardId, item) {
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

function deleteCardSection(columns, cardId, sectionItem) {
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

function addSectionChecklist(columns, cardId, sectionItemId, row) {
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

function updateSectionChecklist(columns, cardId, sectionItemId, row, param) {
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

function deleteSectionChecklist(columns, cardId, sectionItemId, rowId) {
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

function save(data) {
	localStorage.setItem("kanban-data", JSON.stringify(data));
}

// initial state
const state = () => ({
	columnId: null,
	columns: [],
	cardId: null,
	draggingElemHeight: 0,
});

// getters
const getters = {
	columnId: (state) => state.columnId,
	columns: (state) => state.columns,
	cardId: (state) => state.cardId,
	draggingElemHeight: (state) => state.draggingElemHeight,
};

// actions
const actions = {
	async getColumns({ commit }) {
		const columns = await localStorage.getItem("kanban-data");
		commit("SET_COLUMNS", JSON.parse(columns));
	},
	async getColumnId({ commit }, columnId) {
		commit("SET_COLUMN_ID", columnId);
	},
	async getCardId({ commit }, cardId) {
		commit("SET_CARD_ID", cardId);
	},
	async getDraggingElemHeight({ commit }, height) {
		commit("SET_DRAGGING_ELEM_HEIGHT", height);
	},
	async addCardSection({ commit }, detail) {
		const columns = await localStorage.getItem("kanban-data");
		let d = {
			detail: detail,
		};
		let c = {
			columns: JSON.parse(columns),
		};
		let payload = { ...d, ...c };
		commit("CREATE_NEW_CARD_SECTION", payload);
	},
	async deleteCardSection({ commit }, detail) {
		const columns = await localStorage.getItem("kanban-data");
		let d = {
			detail: detail,
		};
		let c = {
			columns: JSON.parse(columns),
		};
		let payload = { ...d, ...c };
		commit("DELETE_CARD_SECTION", payload);
	},
	async addSectionChecklist({ commit }, detail) {
		const columns = await localStorage.getItem("kanban-data");
		let d = {
			detail: detail,
		};
		let c = {
			columns: JSON.parse(columns),
		};
		let payload = { ...d, ...c };
		commit("CREATE_NEW_SECTION_CHECKLIST", payload);
	},
	async updateSectionChecklist({ commit }, detail) {
		const columns = await localStorage.getItem("kanban-data");
		let d = {
			detail: detail,
		};
		let c = {
			columns: JSON.parse(columns),
		};
		let payload = { ...d, ...c };
		commit("UPDATE_SECTION_CHECKLIST", payload);
	},
	async deleteSectionChecklist({ commit }, detail) {
		const columns = await localStorage.getItem("kanban-data");
		let d = {
			detail: detail,
		};
		let c = {
			columns: JSON.parse(columns),
		};
		let payload = { ...d, ...c };
		commit("DELETE_SECTION_CHECKLIST", payload);
	},
};

// mutations
const mutations = {
	SET_COLUMNS(state, columns) {
		state.columns = columns;
	},
	SET_COLUMN_ID(state, columnId) {
		state.columnId = columnId;
	},
	SET_CARD_ID(state, cardId) {
		state.cardId = cardId;
	},
	SET_DRAGGING_ELEM_HEIGHT(state, height) {
		state.draggingElemHeight = height;
	},
	CREATE_NEW_CARD_SECTION(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let item = detail.item;
		let columns = addCardSection(payload.columns, cardId, item);
		save(columns);
		state.columns = columns;
	},
	DELETE_CARD_SECTION(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let item = detail.item;
		let columns = deleteCardSection(payload.columns, cardId, item);
		save(columns);
		state.columns = columns;
	},
	CREATE_NEW_SECTION_CHECKLIST(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let sectionItemId = detail.sectionItemId;
		let row = detail.row;
		let columns = addSectionChecklist(
			payload.columns,
			cardId,
			sectionItemId,
			row
		);
		save(columns);
		state.columns = columns;
	},
	UPDATE_SECTION_CHECKLIST(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let sectionItemId = detail.sectionItemId;
		let row = detail.row;
		let param = detail.param;
		let columns = updateSectionChecklist(
			payload.columns,
			cardId,
			sectionItemId,
			row,
			param
		);
		save(columns);
		state.columns = columns;
	},
	DELETE_SECTION_CHECKLIST(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let sectionItemId = detail.sectionItemId;
		let rowId = detail.rowId;
		let columns = deleteSectionChecklist(
			payload.columns,
			cardId,
			sectionItemId,
			rowId
		);
		save(columns);
		state.columns = columns;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
