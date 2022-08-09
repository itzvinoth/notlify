function replaceCardChecklist (columns, cardId, item) {
	let cols = []
	for (var i = 0; i < columns.length; i++) {
		let column = columns[i]
		for (var j = 0; j < column.cards.length; j++) {
			let card = column.cards[j]
			if (card.id === cardId) {
				let c = card.checklist || []
				c.push(item)
				card.checklist = c
			}
		}
		cols.push(column)
	}
	return cols
}

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
		console.log('set columns: ', columns)
		state.columns = columns
	},
	setCardId (state, cardId) {
		state.cardId = cardId
	},
	setDraggingElemHeight (state, height) {
		state.draggingElemHeight = height
	},
	setCardChecklist (state, payload) {
		let detail = payload.detail
		let cardId = detail.cardId
		let item = detail.item
		let columns = replaceCardChecklist(payload.columns, cardId, item)
		state.columns = columns
		// card.checklist = c
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}