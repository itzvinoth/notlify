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
		return { width: window.innerWidth, height: window.innerHeight };
	},
	created() {
		window.addEventListener('resize', this.onResize);
	},
	destroyed() {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		onResize (e) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		}
	}
};
</script>