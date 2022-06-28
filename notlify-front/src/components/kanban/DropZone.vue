<template>
	<div class="kb__dropzone" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop" @dragenter.prevent></div>
</template>

<script>
import KanbanApi from '../../api'
export default {
	name: 'DropZone',
	props: {
		cardId: {
			type: Number
		}
	},
	methods: {
		onDragOver (event) {
			event.preventDefault()
			event.target.classList.add('placeholder')
		},
		onDragLeave (event) {
			event.preventDefault()
			event.target.classList.remove('placeholder')
		},
		onDrop (event) {
			event.preventDefault()
			event.target.classList.remove('placeholder')

			let columnElement = event.target.closest('.kb__column')
			let columnId = Number(columnElement.dataset.id)

			let dropZonesInColumn = Array.from(columnElement.querySelectorAll('.kb__dropzone'))
			
			// to get position in the column
			let droppedIndex = dropZonesInColumn.indexOf(event.target)
			
			let cardId = Number(event.dataTransfer.getData('text/plain'))

			// kb-card__container contains data-id attribute
			let droppedItemElement = document.querySelector(`[data-id="${cardId}"]`)
			
			const insertAfter = event.target.previousSibling.classList.contains('kb__card') ? event.target.previousSibling : event.target

			// we should exit, if dragging element agains drops into the same place.
			if (droppedItemElement.contains(event.target)) {
				return
			}

			// updating the UI
			insertAfter.parentElement.after(droppedItemElement)
			KanbanApi.updateCard(cardId, {
				columnId,
				position: droppedIndex
			})
		}
	},
}
</script>