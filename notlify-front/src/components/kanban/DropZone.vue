<template>
	<div class="kb__dropzone" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop" @dragenter.prevent></div>
</template>

<script>
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

			let columnElement = event.target.parentElement.parentElement.parentElement
			let columnId = Number(columnElement.dataset.id)
			console.log('columnId: ', columnId)
			
		}
	},
}
</script>