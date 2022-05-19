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
		<div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
			<div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
				{{ item.title }}
			</div>
		</div>
		<div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
			<div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'WorkSpace',
	setup() {
		const listItems = ref([
			{ id: 0, title: 'John', list: 1 },
			{ id: 1, title: 'Joao', list: 1 },
			{ id: 2, title: 'Jean', list: 2 }
		])
		const getList = (list) => {
			return listItems.value.filter((item) => item.list === list)
		}

		const startDrag = (event, item) => {
			event.dataTransfer.dropEffect = 'move'
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.setData('itemId', item.id)
		}
		const onDrop = (event, list) => {
			const itemId = event.dataTransfer.getData('itemId')
			const item = listItems.value.find((item) => item.id === Number(itemId))
			item.list = list
		}
		return {
			getList,
			startDrag,
			onDrop
		}
	},
	data () {
		return {
			enabled: true,
			workspaceTitle: 'Board title',
			isEditingTitle: false,
			listItems: [
				{ id: 0, name: 'John', list: 1 },
				{ id: 1, name: 'Joao', list: 1 },
				{ id: 2, name: 'Jean', list: 2 }
			]
		}
	},
	methods: {
		handleEditTitle (type) {
			if (type === 'edit') {
				this.isEditingTitle = true
			} else if (type === 'save') {
				this.isEditingTitle = false
			}
		}
	},
}
</script>

<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>