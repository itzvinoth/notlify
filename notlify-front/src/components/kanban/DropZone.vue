<template>
	<div class="kb__dropzone" @drop="handleDrop" @dragenter.prevent @dragover.prevent>

	</div>
</template>

<script>
export default {
	name: 'DropZone',
	methods: {
		handleDrop (e) {
			e.preventDefault()
			let dropZone = document.getElementsByClassName('kb__dropzone')[0]
			dropZone.classList.add('kb__dropzone--active')
		}
	},
}
</script>