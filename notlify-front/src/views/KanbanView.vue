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
			columns: []
		}
	},
	mounted () {
		let json = localStorage.getItem('kanban-data')
		this.columns = JSON.parse(json)
		console.log('for sample testing: ', json)
	}
}
</script>