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
	name: "Popover",
	data() {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
};
</script>
