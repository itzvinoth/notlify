<template>
	<div class="kb__dropzone" @dragover="dragOverHandler" @dragleave="dragLeaveHandler">

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
			elems.forEach(el => el.classList.add('kb__dropzone--active'))
		},
		dragLeaveHandler (e) {
			e.preventDefault()
			let dropZone = Array.from(document.getElementsByClassName('kb__card'))
			dropZone.forEach(el => el.classList.remove('kb__dropzone--active'))
		}
	},
}
</script>