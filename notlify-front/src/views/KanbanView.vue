<template>
	<div class="kb-container">
		<div class="kb__column">
			<div class="kb__column--title">
				Column title
			</div>
			<div class="kb__column--cards">
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
			columns: [{
				'id': 1,
				'title': 'User manual'
			}, {
				'id': 2,
				'title': 'Things to try'
			}, {
				'id': 3,
				'title': 'More to try'
			}]
		}
	}
}
</script>