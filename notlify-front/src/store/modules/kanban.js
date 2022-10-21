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
	// columns
	async getColumns({ commit }) {
		const columns = await localStorage.getItem("kanban-data");
		commit("SET_COLUMNS", JSON.parse(columns));
	},
	async getColumnId({ commit }, columnId) {
		commit("SET_COLUMN_ID", columnId);
	},
	// card
	async getCardId({ commit }, cardId) {
		commit("SET_CARD_ID", cardId);
	},
	async getDraggingElemHeight({ commit }, height) {
		commit("SET_DRAGGING_ELEM_HEIGHT", height);
	}
};

// mutations
const mutations = {
	// columns
	SET_COLUMNS(state, columns) {
		state.columns = columns;
	},
	SET_COLUMN_ID(state, columnId) {
		state.columnId = columnId;
	},
	// card
	SET_CARD_ID(state, cardId) {
		state.cardId = cardId;
	},
	SET_DRAGGING_ELEM_HEIGHT(state, height) {
		state.draggingElemHeight = height;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
