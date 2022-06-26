<template>
	<div class="kb__column--cards">
		<drop-zone />
		<div class="kb-card__container" v-for="card in cards" :key="card.id">
			<div class="kb__card" draggable="true" @dragstart="onDragStart($event, card.id)" @drag="onDrag" @dragenter.prevent @dragover.prevent @dblclick="onDblClick($event, card.id)">
				<div class="kb__card--input" @blur="onBlur($event, card.id)" contenteditable>{{ card.title }}</div>
			</div>
			<drop-zone :cardId="card.id"/>
		</div>
		<!-- <div class="kb__card" draggable="true" v-for="card in cards" :key="card.id" :data-id="card.id" @dragstart="onDragStart($event, card.id)" @dragenter.prevent @dragover.prevent @dblclick="onDblClick($event, card.id)">
			<div class="kb__card--input" @blur="onBlur($event, card.id)" contenteditable>{{ card.title }}</div>
			<drop-zone :cardId="card.id"/>
		</div> -->
	</div>
</template>

<script>
import DropZone from "@/components/kanban/DropZone.vue";
import KanbanApi from "../../api/index"

let draggingEle;
let x = 0;
let y = 0;
let rect;

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
			rect = draggingEle.getBoundingClientRect()
			x = event.pageX - rect.left
			y = event.pageY - rect.top
			// document.addEventListener('mousemove', this.mouseMoveHandler);

			// draggingEle.querySelector('.kb__card--input').style.display = 'none'
			// draggingEle.querySelector('.kb__card--input').classList.add('placeholder')
			// draggingEle.querySelector('.kb__dropzone').style.height = `${rect.height - 10}px`
		},
		onDrag (event) {
			// draggingEle.style.position = 'absolute'
			// draggingEle.style.width = '190px'
			// draggingEle.style.top = `${event.pageY - y}px`
			// draggingEle.style.left = `${event.pageX - x}px`
			// draggingEle.parentNode.querySelector('.kb__dropzone').classList.add('placeholder')
			// draggingEle.parentNode.querySelector('.kb__dropzone').style.height = `${rect.height}px`
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