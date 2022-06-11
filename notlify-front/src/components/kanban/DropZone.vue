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
			event.target.classList.add('kb__dropzone--active')
		},
		onDragLeave (event) {
			event.preventDefault()
			event.target.classList.remove('kb__dropzone--active')
		},
		onDrop (event) {
			event.preventDefault()
			event.target.classList.remove('kb__dropzone--active')

			let columnElement = event.target.closest('.kb__column')
			let columnId = Number(columnElement.dataset.id)

			let dropZonesInColumn = Array.from(columnElement.querySelectorAll('.kb__dropzone'))
			
			// to get position in the column
			let droppedIndex = dropZonesInColumn.indexOf(event.target)
			
			let cardId = Number(event.dataTransfer.getData('text/plain'))
			let droppedItemElement = document.querySelector(`[data-id="${cardId}"]`)

			const insertAfter = event.target.parentElement.classList.contains("kb__card") ? event.target.parentElement : event.target

			if (droppedItemElement.contains(event.target)) {
				return
			}

			insertAfter.after(droppedItemElement)
			KanbanApi.updateCard(cardId, {
				columnId,
				position: droppedIndex
			})
		}
	},
}
</script>