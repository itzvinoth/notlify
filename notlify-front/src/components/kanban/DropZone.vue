<template>
	<div class="kb__dropzone" @dragover="dragOverHandler" @dragleave="dragLeaveHandler" @drop="dropHandler" @dragenter.prevent></div>
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
		dragOverHandler (e) {
			e.preventDefault()
			e.target.classList.add('kb__dropzone--active')
		},
		dragLeaveHandler (e) {
			e.preventDefault()
			e.target.classList.remove('kb__dropzone--active')
		},
		dropHandler (e) {
			e.preventDefault()
			e.target.classList.remove('kb__dropzone--active')

			let columnElement = e.target.parentElement.parentElement.parentElement
			let columnId = Number(columnElement.dataset.id)
			console.log('columnId: ', columnId)
			
		}
	},
}
</script>