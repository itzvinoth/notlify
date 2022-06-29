<template>
	<div class="kb__columns">
		<div class="kb__column" v-for="column in columns" :key="column.id" :data-id="column.id">
			<div class="kb__column--title">
				{{ column.title }}
			</div>
			<card :cards="column.cards" :column-id="column.id" :editable="editable" :new-card-column-index="newCardColumnIndex" />
			<button class="kb__add-item" type="button" @click="addCard(column.id)">Add a card</button>
		</div>
	</div>
</template>

<script>
import Card from "@/components/kanban/Card.vue";
import KanbanApi from "../../api/index";

export default {
	components: {
		'card': Card
	},
	data () {
		return {
			editable: false,
			newCardColumnIndex: null
		}
	},
	props: {
		columns: {
			type: Object
		}
	},
	methods: {
		addCard (id) {
			this.editable = true
			this.newCardColumnIndex = id
			let newCard = KanbanApi.insertCard(id, "")
			// this.$emit('addNewCard')
			// vuex commit update kanban
			this.$store.dispatch('kanban/getColumns')
		}
	},
}
</script>