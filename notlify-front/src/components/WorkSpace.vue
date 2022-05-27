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
					<span @click="cardHandler('add', list.key)" class="add-card">Add card</span>
				</div>
				<div v-if="list.key === listKey && isAddingCard">
					<input type="text" v-model="list.newCard" :ref="`cardtitle-${list.key}`"  @keypress.enter="cardHandler('save', list.key)" placeholder="Enter a card title"/>
					<div @click="cardHandler('save', list.key)" class="save-card">Save</div>
				</div>
			</div>
		</div>
		<div id="list">
			<div class="draggable" @mousedown="mouseDown">A</div>
			<div class="draggable" @mousedown="mouseDown">B</div>
			<div class="draggable" @mousedown="mouseDown">C</div>
			<div class="draggable" @mousedown="mouseDown">D</div>
			<div class="draggable" @mousedown="mouseDown">E</div>
		</div>
		<div id="list2">
			<div class="draggable" @mousedown="mouseDown">F</div>
			<div class="draggable" @mousedown="mouseDown">G</div>
			<div class="draggable" @mousedown="mouseDown">H</div>
			<div class="draggable" @mousedown="mouseDown">I</div>
			<div class="draggable" @mousedown="mouseDown">J</div>
		</div>
	</div>
</template>

<script>
let draggingEle;
let placeholder;
let isDraggingStarted = false;
// The current position of mouse relative to the dragging element
let x = 0;
let y = 0;

// Swap two nodes
const swap = function (nodeA, nodeB) {
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

	// Move `nodeA` to before the `nodeB`
	nodeB.parentNode.insertBefore(nodeA, nodeB);

	// Move `nodeB` to before the sibling of `nodeA`
	parentA.insertBefore(nodeB, siblingA);
};

// Check if `nodeA` is above `nodeB`
const isAbove = function (nodeA, nodeB) {
	// Get the bounding rectangle of nodes
	const rectA = nodeA.getBoundingClientRect();
	const rectB = nodeB.getBoundingClientRect();

	return rectA.top < rectB.top;
};

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
						{ "id": 0, "title": "Drag notes within list to rearrange." },
						{ "id": 1, "title": "Works between the lists too." },
						{ "id": 2, "title": "Option to add a new list." },
						{ "id": 3, "title": "List title should be editable." }
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
		mouseDown (e) {
			draggingEle = e.target;
			// Calculate the mouse position
			const rect = draggingEle.getBoundingClientRect();
			x = e.pageX - rect.left;
			y = e.pageY - rect.top;
			document.addEventListener('mousemove', this.mouseMoveHandler);
			document.addEventListener('mouseup', this.mouseUpHandler);
		},
		mouseMoveHandler (e) {
			const draggingRect = draggingEle.getBoundingClientRect();
			if (!isDraggingStarted) {
				isDraggingStarted = true;

				// Let the placeholder take the height of dragging element
				// So the next element won't move up
				placeholder = document.createElement('div');
				placeholder.classList.add('placeholder');
				// inserting the placeholder before the next sibling of the dragging element
				// ex: insertBefore(newNode, referenceNode)
				draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
				placeholder.style.height = `${draggingRect.height}px`;
			}
			// Set position for dragging element
			draggingEle.style.position = 'absolute';
			draggingEle.style.top = `${e.pageY - y}px`;
			draggingEle.style.left = `${e.pageX - x}px`;
			// The current order
			// prevEle
			// draggingEle
			// placeholder
			// nextEle
			const prevEle = draggingEle.previousElementSibling;
			const nextEle = placeholder.nextElementSibling;

			// The dragging element is above the previous element
			// User moves the dragging element to the top
			// case applies when dragging element is above previous element
			if (prevEle && isAbove(draggingEle, prevEle)) {
				// inserting the dragging element before the prev element
				draggingEle.parentNode.insertBefore(draggingEle, prevEle)
				// inserting the placeholder before the prev element
				draggingEle.parentNode.insertBefore(placeholder, prevEle)
				return;
			}

			// The dragging element is below the next element
			// User moves the dragging element to the bottom
			if (nextEle && isAbove(nextEle, draggingEle)) {
				// inserting the placeholder before the next element
				// draggingEle.parentNode.insertBefore(nextEle, placeholder)
				// inserting the dragging element before the next element
				draggingEle.parentNode.insertBefore(nextEle, draggingEle)
				return
			}
		},
		mouseUpHandler () {
			// Remove the placeholder
			placeholder && placeholder.parentNode.removeChild(placeholder);

			draggingEle.style.removeProperty('top');
			draggingEle.style.removeProperty('left');
			draggingEle.style.removeProperty('position');

			x = null;
			y = null;
			draggingEle = null;
			isDraggingStarted = false;

			// Remove the handlers of `mousemove` and `mouseup`
			document.removeEventListener('mousemove', this.mouseMoveHandler);
			document.removeEventListener('mouseup', this.mouseUpHandler);
		},

		runQueue () {},
		cardHandler (type, key) {
			this.listKey = key
			if (type === 'add') {
				this.isAddingCard = true
				this.$nextTick(() => {
					this.$refs[`cardtitle-${key}`][0].focus()
				})
			} else if (type === 'save') {
				this.addCard(key)
			}
		},
		addCard (key) {
			let newCard = {
				id: this.lists[key].length,
				title: this.lists[key]['newCard']
			}
			this.lists[key]['cards'].push(newCard)
			this.resetting(key)
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
		resetting (key) {
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