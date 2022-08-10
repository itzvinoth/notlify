<template>
	<div>
		<div class="kb-container" v-if="columns && columns.length > 0">
			<column :columns="columns" />
		</div>
		<div v-if="!columns">No columns available.</div>		
	</div>
</template>

<script>
import Column from "@/components/kanban/Column.vue";
import KanbanApi from "../api/index"

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'kanban',
	components: {
		'column': Column
	},
	computed: {
		...mapGetters('kanban', {
			columns: 'columns'
		})
	},
	created () {
		this.$store.dispatch('kanban/getColumns')
	}
}
</script>