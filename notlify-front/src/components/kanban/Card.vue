<template>
	<div class="kb__column--cards">
		<div class="kb__card" draggable="true" v-for="card in cards" :key="card.id" :data-id="card.id" @dragstart="onDragStart($event, card.id)" @dragenter.prevent @dragover.prevent>
			<div class="kb__card--input" contenteditable>{{ card.title }}</div>
			<drop-zone :cardId="card.id"/>
		</div>
	</div>
</template>

<script>
import DropZone from "@/components/kanban/DropZone.vue";

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
	methods: {
		onDragStart (event, id) {
			event.dataTransfer.setData('text/plain', id)
		}
	},
}
</script>