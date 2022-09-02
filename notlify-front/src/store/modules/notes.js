// initial state
const state = () => ({
	notes: [],
});

// getters
const getters = {
	notes: (state) => state.notes,
};

// actions
const actions = {
	async getNotes({ commit }) {
		const notes = await localStorage.getItem("notes-data");
		commit("SET_NOTES", JSON.parse(notes));
	},
};

// mutations
const mutations = {
	SET_NOTES(state, notes) {
		state.notes = notes;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
