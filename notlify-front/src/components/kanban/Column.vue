<template>
	<div class="kb__columns">
		<div class="kb__column" v-for="column in columns" :key="column.id" :data-id="column.id">
			<div class="kb__column--title">
				{{ column.title }}
			</div>
			<card :cards="column.cards" />
			<button class="kb__add-item" type="button" @click="addCard(column.id)">Add card</button>
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
	props: {
		columns: {
			type: Object
		}
	},
	methods: {
		addCard (id) {
			let newCard = KanbanApi.insertCard(id, "")
			this.$emit('addNewCard')
		}
	},
}
</script>