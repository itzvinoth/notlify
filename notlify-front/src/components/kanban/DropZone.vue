<template>
	<div class="kb__dropzone" @drop="checkDrop">

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
		checkDrop (e) {
			e.preventDefault()
			let dropZone = document.getElementsByClassName('kb__card')
			let elems = Array.from(dropZone).filter(el => Number(el.getAttribute('data-id')) === this.cardId)
			elems.forEach(el => el.classList.add('kb__dropzone--active'))
		}
	},
}
</script>