<template>
	<div class="kb-container">
		<column :columns="columns" />
	</div>
</template>

<script>
import Column from "@/components/kanban/Column.vue";

export default {
	name: 'kanban',
	components: {
		'column': Column
	},
	data () {
		return {
			columns: [{
				'id': 1,
				'title': 'User manual'
			}, {
				'id': 2,
				'title': 'Things to try'
			}, {
				'id': 3,
				'title': 'More to try'
			}]
		}
	}
}
</script>