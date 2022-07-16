<template>
	<div class="popover-container">
		<div class="popover">
			<slot name="trigger" />
			<slot name="body" />
		</div>
	</div>
</template>

<script>
// get position of the trigger element in the browser
export default {
	name: 'Popover',
	data () {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	},
	created() {
		window.addEventListener('resize', this.onResize);
	},
	destroyed() {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		onResize (e) {
			let elem = document.getElementsByClassName('menu-dropdown')[0]
			let rect = elem.getBoundingClientRect()
			let parent = elem.closest('.popover')
			let rectParent = parent.getBoundingClientRect()
			if (rect.bottom > window.innerHeight) {
				elem.style.top = `${window.innerHeight - rectParent.bottom - rect.height}px`
			}
		}
	}
};
</script>