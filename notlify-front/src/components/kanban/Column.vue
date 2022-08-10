<template>
	<div class="kb__columns">
		<div class="kb__column" v-for="column in columns" :key="column.id" :data-id="column.id">
			<vue-feather type="more-horizontal"></vue-feather>
			<div class="kb__column--title">
				{{ column.title }}
			</div>
			<card :cards="column.cards" :column-id="column.id" :column-title="column.title" />
			<!-- <button class="kb__add-item" type="button" @click="addCard(column.id)">Add a card</button> -->
			<div class="card-composer">
				<span v-if="column.id !== columnId" @click="cardComposer('add', column.id)" class="add-card">Add a card</span>
				<div v-if="isComposingNewCard && column.id === columnId">
					<textarea class="card-composer__textarea" v-model="newCardTitle" :ref="`cardtitle-${column.id}`"  @keypress.enter="cardComposer('save', column.id)" placeholder="Enter a card title" />
					<button @click="cardComposer('save', column.id)" class="save-card">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Card from "@/components/kanban/Card.vue";
import KanbanApi from "../../api/index";

import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		'card': Card
	},
	data () {
		return {
			isComposingNewCard: false,
			newCardTitle: '',
			newCardId: null,
			columnId: null
		}
	},
	computed: {
		...mapGetters('kanban', {
			cardId: 'cardId',
			columns: 'columns'
		})
	},
	methods: {
		// addCard (id) {
		// 	let newCard = KanbanApi.insertCard(id, '')
		// 	// vuex commit update kanban
		// 	this.$store.dispatch('kanban/getColumns')
		// },
		cardComposer (type, columnId) {
			if (type === 'add') {
				this.columnId = columnId
				this.isComposingNewCard = true
				let newCardId = Math.floor(Math.random() * 100000)
				this.newCardId = newCardId
			} else if (type === 'save') {
				let id = this.newCardId
				KanbanApi.insertCard(columnId, id)
				KanbanApi.updateCard(id, {
					'title': this.newCardTitle,
					'checklist': []
				})
				// vuex commit update kanban
				this.$store.dispatch('kanban/getColumns')
				this.reset()
			}
		},
		reset () {
			this.newCardTitle = ''
			this.newCardId = null
			this.columnId = null
		}
	},
}
</script>