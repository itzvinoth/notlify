<template>
	<div class="kb__dropzone" @dragover="dragOverHandler" @dragleave="dragLeaveHandler" @drop="dropHandler" @dragenter.prevent>

	</div>
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
			let dropZone = document.getElementsByClassName('kb__card')
			let elems = Array.from(dropZone).filter(el => Number(el.getAttribute('data-id')) === this.cardId)			
			elems.forEach(el => el.querySelector('.kb__dropzone').classList.add('kb__dropzone--active'))
		},
		dragLeaveHandler (e) {
			e.preventDefault()
			let dropZone = Array.from(document.getElementsByClassName('kb__card'))
			dropZone.forEach(el => el.querySelector('.kb__dropzone').classList.remove('kb__dropzone--active'))
		},
		dropHandler (e) {
			console.log(e)
			e.preventDefault()
			let dropZone = Array.from(document.getElementsByClassName('kb__card'))
			dropZone.forEach(el => el.classList.remove('kb__dropzone--active'))
			
			let elem = Array.from(document.getElementsByClassName('kb__card')).find(el => Number(el.getAttribute('data-id')) === this.cardId)

			let columnElement = elem.parentElement.parentElement
			let columnId = Number(columnElement.dataset.id)
			console.log('columnId: ', columnId)
		}
	},
}
</script>