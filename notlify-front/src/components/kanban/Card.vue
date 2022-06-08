<template>
	<div class="kb__column--cards">
		<div class="kb__card" draggable="true" v-for="card in cards" :key="card.id" :data-id="card.id" @dragstart="onDragStart($event, card.id)">
			<div class="kb__card--input" contenteditable>{{ card.title }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'card',
	props: {
		cards: {
			type: Object
		}
	},
	methods: {
		onDragStart (event, id) {
			event.dataTransfer.setData('text/plain', id)
			console.log('event: ', event, id)
		}
	},
}
</script>