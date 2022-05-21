<template>
	<div class="workspace">
		<!-- <div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
			<div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
				{{ item.title }}
			</div>
		</div>
		<div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
			<div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
				{{ item.title }}
			</div>
		</div> -->
		<div class="drop-zone" v-for="list in computedList" :key="list.key" @drop="onDrop($event, list.key)" @dragenter.prevent @dragover.prevent>
			<div class="list-title">{{ list.title }}</div>
			<div v-for="card in list.cards" :key="`${list.key}+${card.id}`" class="drag-el" draggable="true" @dragstart="startDrag($event, card, list.key)">
				{{ card.title }}
			</div>
			<div class="add-card__container">
				<div v-if="list.key !== listKey">
					<span @click="handleEditTitle('add', list.key)" class="add-card">Add card</span>
				</div>
				<div v-if="list.key === listKey && isAddingCard">
					<input type="text" v-model="list.newCard" :ref="`cardtitle-${list.key}`"  @keypress.enter="handleEditTitle('save', list.key)" placeholder="Enter a card title"/>
					<div @click="handleEditTitle('save', list.key)" class="save-card">Save</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WorkSpace',
	data () {
		return {
			draggableCardOriginListId: null,
			listKey: null,
			cardTitle: '',
			isAddingCard: false,
			listItems: [
				{ id: 0, title: 'John', list: 1 },
				{ id: 1, title: 'Joao', list: 1 },
				{ id: 2, title: 'Jean', list: 2 }
			],
			lists: [
				{
					"key": 0,
					"title": "User manual",
					"newCard": "",
					"cards": [
						{ "id": 0, "title": "Set of lists is a board" },
						{ "id": 1, "title": "Set of cards is a list" },
						{ "id": 2, "title": "All data is saved" }
					]
				},
				{
					"key": 1,
					"title": "Things to try",
					"newCard": "",
					"cards": [
						{ "id": 0, "title": "Click on a card to edit" },
						{ "id": 1, "title": "Click save after editing" },
						{ "id": 2, "title": "To discard chages press esc" }
					]
				},
				{
					"key": 2,
					"title": "More to try",
					"newCard": "",
					"cards": [
						{ "id": 0, "title": "Drag notes around to rearrange." },
						{ "id": 1, "title": "Works between the lists too." },
						{ "id": 2, "title": "Try adding a new list." }
					]
				}
			]
		}
	},
	computed: {
		computedList () {
			return this.lists
		}
	},
	methods: {
		handleEditTitle (type, key) {
			this.listKey = key
			if (type === 'add') {
				this.isAddingCard = true
				this.$nextTick(() => {
					this.$refs[`cardtitle-${key}`][0].focus()
				})
			} else if (type === 'save') {
				let newCard = {
					id: this.lists[key].length,
					title: this.lists[key]['newCard']
				}
				this.lists[key]['cards'].push(newCard)
				this.resetNewCardAdd(key)
			}
		},
		getList (list) {
			return this.listItems.filter((item) => item.list === list)
		},
		startDrag (event, card, listKey) {
			this.draggableCardOriginListId = listKey
			event.dataTransfer.dropEffect = 'move'
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.setData('card', JSON.stringify(card))
		},
		onDrop (event, index) {
			let card = JSON.parse(event.dataTransfer.getData('card'))
			this.lists[index]['cards'].push(card)

			// draggable card should be removed from the origin list.
			let cards = this.lists[this.draggableCardOriginListId]['cards']
			let cardIndex = cards.map(c => c.id).indexOf(card.id)
			cards = cards.splice(cardIndex, 1)
		},
		resetNewCardAdd (key) {
			this.lists[key]['newCard'] = ''
			this.cardTitle = ''
			this.listKey = null
			this.isAddingCard = false
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