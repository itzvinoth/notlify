<template>
	<div class="kb__column--cards">
		<drop-zone />
		<div class="kb__card" draggable="true" v-for="card in cards" :key="card.id" :data-id="card.id" @dragstart="onDragStart($event, card.id)" @dragenter.prevent @dragover.prevent @dblclick="onDblClick($event, card.id)">
			<div class="kb__card--input" @blur="onBlur($event, card.id)" contenteditable>{{ card.title }}</div>
			<drop-zone :cardId="card.id"/>
		</div>
	</div>
</template>

<script>
import DropZone from "@/components/kanban/DropZone.vue";
import KanbanApi from "../../api/index"

let draggingEle;
let x = 0;
let y = 0;

export default {
	name: 'card',
	components: {
		'drop-zone': DropZone
	},
	props: {
		cards: {
			type: Object
		}
	},
	data() {
		return {
			content: ''
		}
	},
	methods: {
		onDragStart (event, id) {
			event.dataTransfer.setData('text/plain', id)
			draggingEle = event.target
			let rect = draggingEle.getBoundingClientRect()
			x = event.pageX - rect.left
			y = event.pageY - rect.top
			console.log('x: ', x, 'y: ', y)
		},
		onBlur (event, id) {
			let newContent = event.target.textContent.trim()

			if (newContent === this.content) {
				return
			}
			KanbanApi.updateCard(id, {
				title: newContent
			});
		},
		onDblClick (event, id) {
			let check = confirm('Are you sure you want to delete this card')
			if (check) {
				this.deleteCard(id)
			}
		},
		deleteCard (id) {
			KanbanApi.deleteCard(id)
			// vuex commit update kanban
			this.$store.dispatch('kanban/getColumns')
		}
	},
}
</script>