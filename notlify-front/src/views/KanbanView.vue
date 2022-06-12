<template>
	<div class="kb-container" v-if="columns.length > 0">
		<column :columns="columns" @addNewCard="callStorage" />
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
		this.callStorage()		
	},
	methods: {
		callStorage() {
			let json = localStorage.getItem('kanban-data')
			this.columns = JSON.parse(json)
		}
	}
}
</script>