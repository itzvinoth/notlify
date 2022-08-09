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
	},
	async updateCardChecklist ({ commit }, detail) {
		const columns = await localStorage.getItem('kanban-data')
		let d = {
			'detail': detail
		}
		let c = {
			'columns': JSON.parse(columns)
		}
		let payload = {...d, ...c}
		commit('setCardChecklist', payload)
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
	},
	setCardChecklist (state, payload) {
		let columns = payload.columns
		let detail = payload.detail
		const [card, currentColumn] = (() => {
			for (const column of columns) {
				const card = column.cards.find(card => card.id === detail.cardId);

				if (card) {
					return [card, column];
				}
			}
		})();
		console.log('card:: ', card)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}