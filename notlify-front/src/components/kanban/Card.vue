<template>
	<div class="kb__column--cards">
		<drop-zone />
		<div class="kb__card" draggable="true" v-for="card in cards" :key="card.id" :data-id="card.id" @dragstart="onDragStart($event, card.id)" @dragenter.prevent @dragover.prevent>
			<div class="kb__card--input" @blur="onBlur($event, card.id)" contenteditable>{{ card.title }}</div>
			<drop-zone :cardId="card.id"/>
		</div>
	</div>
</template>

<script>
import DropZone from "@/components/kanban/DropZone.vue";
import KanbanApi from "../../api/index"

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
		},
		onBlur (event, id) {
			let newContent = event.target.textContent.trim()

			if (newContent === this.content) {
				return
			}
			KanbanApi.updateCard(id, {
				title: newContent
			});
		}
	},
}
</script>