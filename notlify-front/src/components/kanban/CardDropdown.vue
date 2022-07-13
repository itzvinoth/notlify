<template>
	<div class="menu-dropdown">
		<slot name="title" />
		<ul class="list">
			<slot name="list" />
		</ul>
	</div>
</template>

<script>
export default {
	mounted() {
		let dropdown = document.getElementsByClassName('menu-dropdown')[0]
		console.log(dropdown.getBoundingClientRect())
	},
}
</script>