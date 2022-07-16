// initial state
const state = () => ({
	columns: [],
	cardId: null,
	draggingElemHeight: 0
})

// getters
const getters = {
	columns: state => state.columns,
	cardId: state => state.cardId,
	draggingElemHeight: state => state.draggingElemHeight
}

// actions
const actions = {
	async getColumns ({ commit }) {
		const columns = await localStorage.getItem('kanban-data')
		commit('setColumns', JSON.parse(columns))
	},
	async getCardId ({ commit }, cardId) {
		commit('setCardId', cardId)
	},
	async getDraggingElemHeight ({ commit }, height) {
		commit('setDraggingElemHeight', height)
	}
}

// mutations
const mutations = {
	setColumns (state, columns) {
		state.columns = columns
	},
	setCardId (state, cardId) {
		state.cardId = cardId
	},
	setDraggingElemHeight (state, height) {
		state.draggingElemHeight = height
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}