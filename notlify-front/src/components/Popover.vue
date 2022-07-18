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
	created () {
		window.addEventListener('resize', this.onResize);
	},
	destroyed () {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		onResize (e) {
			if (document.getElementsByClassName('menu-dropdown')[0]) {
				let elem = document.getElementsByClassName('menu-dropdown')[0]
				let rect = elem.getBoundingClientRect()
				let triggeringElem = elem.closest('.popover')
				let rectTriggeringElem = triggeringElem.getBoundingClientRect()
				if ((rect.bottom > window.innerHeight) || (window.innerHeight < (rectTriggeringElem.bottom + rect.height))) {
					elem.style.top = `${window.innerHeight - rectTriggeringElem.bottom - rect.height}px`
				}
				if (window.innerHeight < rect.height + 10) {
					elem.style.top = `0px`
				}
			}
		}
	}
};
</script>