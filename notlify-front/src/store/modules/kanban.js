import {
	addCardSection,
	deleteCardSection,
	addSectionChecklist,
	updateSectionChecklist,
	deleteSectionChecklist,
} from "../../js/kanban/checklist";

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
