<template>
	<div class="kb__columns">
		<div class="kb__column" v-for="column in columns" :key="column.id">
			<div class="kb__column--title">
				{{ column.title }}
			</div>
			<div class="kb__column--cards"></div>
			<button class="kb__add-item" type="button">Add item</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		columns: {
			type: Object
		}
	}
}
</script>