<template>
	<div class="notes">
		<div class="notes-sidebar">
			<button class="note-add--btn" @click="onAddNote">+ Add a note</button>
			<div class="notes-list">
				<div class="notes-list__item">
					<div class="notes-title">Title</div>
					<div class="notes-body">Body on the contents</div>
					<div class="notes-updated">5th Aug, 2022</div>
				</div>
			</div>
		</div>
		<div class="notes-editor">
			<div class="notes-editor__title">Title</div>
			<div class="notes-editor__body">
				<textarea>Body of the contents</textarea>				
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Notes',
	methods: {
		onAddNote () {
			console.log('Create a new note each time')
		}
	}
}
</script>