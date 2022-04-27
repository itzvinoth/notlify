<template>
	<div class="workspace">
		<Transition>
			<div v-if="!isEditingTitle">
				<span @click="handleEditTitle('edit')" class="workspace-title">{{ workspaceTitle }}</span>
			</div>
			<div v-else>
				<input type="text" v-model="workspaceTitle" @keypress.enter="handleEditTitle('save')" />
				<div @click="handleEditTitle('save')">Save</div>
			</div>
		</Transition>
		<!-- <TaskBoard></TaskBoard> -->
		<draggable
			:list="list"
			:disabled="!enabled"
			item-key="name"
			class="list-group"
			ghost-class="ghost"
			:move="checkMove"
			@start="dragging = true"
			@end="dragging = false"
		>
			<template #item="{ element }">
				<div class="list-group-item" :class="{ 'not-draggable': !enabled }">
					{{ element.name }}
				</div>
			</template>
      </draggable>
	</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
	name: 'WorkSpace',
	components: {
		draggable
	},
	data () {
		return {
			enabled: true,
			workspaceTitle: 'Board title',
			isEditingTitle: false,
			list: [
				{ name: 'John', id: 0 },
				{ name: 'Joao', id: 1 },
				{ name: 'Jean', id: 2 }
			],
			dragging: false
		}
	},
	methods: {
		handleEditTitle (type) {
			if (type === 'edit') {
				this.isEditingTitle = true
			} else if (type === 'save') {
				this.isEditingTitle = false
			}
		},
		checkMove (e) {
			window.console.log('Future index: ' + e.draggedContext.futureIndex)
		}
	},
}
</script>