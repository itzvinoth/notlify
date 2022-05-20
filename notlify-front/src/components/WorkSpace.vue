<template>
	<div class="workspace">
		<Transition></Transition>
		<div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
			<div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
				{{ item.title }}
			</div>
			<div v-if="!isAddingCard">
				<span @click="handleEditTitle('add')" class="add-card">Add card</span>
			</div>
			<div v-else>
				<input type="text" v-model="cardTitle" ref="cardtitle"  @keypress.enter="handleEditTitle('save')" placeholder="Enter a card title"/>
				<div @click="handleEditTitle('save')" class="save-card">Save</div>
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
export default {
	name: 'WorkSpace',
	data () {
		return {
			cardTitle: '',
			isAddingCard: false,
			listItems: [
				{ id: 0, title: 'John', list: 1 },
				{ id: 1, title: 'Joao', list: 1 },
				{ id: 2, title: 'Jean', list: 2 }
			]
		}
	},
	methods: {
		handleEditTitle (type) {
			if (type === 'add') {
				this.isAddingCard = true
				this.$nextTick(() => {
					this.$refs.cardtitle.focus()
				})
			} else if (type === 'save') {
				let newCard = {
					id: this.listItems.length,
					title: this.cardTitle,
					list: 1
				}
				this.listItems.push(newCard)
				this.cardTitle = ''
				this.isAddingCard = false
			}
		},
		getList (list) {
			return this.listItems.filter((item) => item.list === list)
		},
		startDrag (event, item) {
			event.dataTransfer.dropEffect = 'move'
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.setData('itemId', item.id)
		},
		onDrop (event, list) {
			const itemId = event.dataTransfer.getData('itemId')
			const item = this.listItems.find((item) => item.id === Number(itemId))
			item.list = list
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