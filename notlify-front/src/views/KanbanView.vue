<template>
	<div class="kb-container">
		<column :columns="columns" />
	</div>
</template>

<script>
import Column from "@/components/kanban/Column.vue";
import KanbanApi from "../api/index"

export default {
	name: 'kanban',
	components: {
		'column': Column
	},
	data () {
		return {
			columns: [{
				'id': 1,
				'title': 'User manual',
				'cards': [
					{ "id": 45798, "title": "Set of lists is a board" },
					{ "id": 25798, "title": "Set of cards is a list" },
					{ "id": 15798, "title": "All data is saved" }]
			}, {
				'id': 2,
				'title': 'Things to try',
				'cards': [
					{ "id": 72714, "title": "Click on a card to edit" },
					{ "id": 12714, "title": "Click save after editing" },
					{ "id": 22714, "title": "To discard chages press esc" }]
			}, {
				'id': 3,
				'title': 'More to try',
				'cards': [
					{ "id": 23044, "title": "Drag notes around to rearrange." },
					{ "id": 13044, "title": "Works between the lists too." },
					{ "id": 33044, "title": "Try adding a new list." }
				]
			}]
		}
	},
	mounted () {
		console.log('for sample testing: ', KanbanApi.getCards(1))
	}
}
</script>