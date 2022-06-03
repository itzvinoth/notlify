<template>
	<div class="kb-container">
		<div class="kb__columns">
			<div class="kb__title">
				Column title
			</div>
			<div class="kb__cards">
				<div class="kb__card--item" contenteditable>Card</div>
				<div class="kb__drop-zone"></div>
			</div>
			<button class="kb__add-item" type="button">Add item</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'kanban',
	data () {
		return {

		}
	}
}
</script>