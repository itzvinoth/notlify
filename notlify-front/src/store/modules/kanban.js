// initial state
const state = () => ({
	columns: []
})

// getters
const getters = {
	columns: state => state.columns
}

// actions
const actions = {
	async getColumns ({ commit }) {
		const columns = await localStorage.getItem('kanban-data')
		commit('setColumns', JSON.parse(columns))
	}
}

// mutations
const mutations = {
	setColumns (state, columns) {
		state.columns = columns
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}