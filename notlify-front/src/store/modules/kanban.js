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

function updateSectionChecklist(columns, cardId, sectionItemId, rowId, param, checklistText) {
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
						console.log("params: ", columns, cardId, sectionItemId, rowId, param, checklistText);
						if (rows[l].id === rowId) {
							if (param === "completed") {
								rows[l].completed = !rows[l].completed;
							} else if (param === "name") {
								rows[l].name = checklistText;
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
		commit("setColumns", JSON.parse(columns));
	},
	async getColumnId({ commit }, columnId) {
		commit("setColumnId", columnId);
	},
	async getCardId({ commit }, cardId) {
		commit("setCardId", cardId);
	},
	async getDraggingElemHeight({ commit }, height) {
		commit("setDraggingElemHeight", height);
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
		commit("createNewCardSection", payload);
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
		commit("createNewSectionChecklist", payload);
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
		commit("updateExistingSectionChecklist", payload);
	},
};

// mutations
const mutations = {
	setColumns(state, columns) {
		state.columns = columns;
	},
	setColumnId(state, columnId) {
		state.columnId = columnId;
	},
	setCardId(state, cardId) {
		state.cardId = cardId;
	},
	setDraggingElemHeight(state, height) {
		state.draggingElemHeight = height;
	},
	createNewCardSection(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let item = detail.item;
		let columns = addCardSection(payload.columns, cardId, item);
		save(columns);
		state.columns = columns;
	},
	createNewSectionChecklist(state, payload) {
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
	updateExistingSectionChecklist(state, payload) {
		let detail = payload.detail;
		let cardId = detail.cardId;
		let sectionItemId = detail.sectionItemId;
		let rowId = detail.rowId;
		let param = detail.param;
		let checklistText = detail.text;
		let columns = updateSectionChecklist(
			payload.columns,
			cardId,
			sectionItemId,
			rowId,
			param,
			checklistText
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
