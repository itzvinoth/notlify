// initial state
const state = () => ({
	columns: [],
	draggingElemHeight: 0
})

// getters
const getters = {
	columns: state => state.columns,
	draggingElemHeight: state => state.draggingElemHeight
}

// actions
const actions = {
	async getColumns ({ commit }) {
		const columns = await localStorage.getItem('kanban-data')
		commit('setColumns', JSON.parse(columns))
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