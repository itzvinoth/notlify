// initial state
const state = () => ({
    notes: []
})

// getters
const getters = {
    notes: state => state.notes
}

// actions
const actions = {
	async getNotes ({ commit }) {
		const notes = await localStorage.getItem('notes-data')
		commit('setNotes', JSON.parse(notes))
	}
}

// mutations
const mutations = {
	setNotes (state, notes) {
		state.notes = notes
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}