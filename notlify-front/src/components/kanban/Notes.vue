<template>
	<div class="notes">
		<div class="notes-sidebar">
			<button class="note-add--btn" @click="onAddNote">+ Add a note</button>
			<div class="notes-list">
				<div class="notes-list__item">
					<div class="notes-title">Title</div>
					<div class="notes-body">Body on the content</div>
					<div class="notes-updated">5th Aug, 2022</div>
				</div>
			</div>
		</div>
		<div class="notes-editor">
			<div class="notes-editor__title">
				<input type="text" placeholder="Enter a title" v-model="title" @blur="onEditNote" />
			</div>
			<div class="notes-editor__body">
				<textarea @blur="onEditNote">Body of the content</textarea>
			</div>
		</div>
	</div>
</template>

<script>
import NotesApi from '../../api/notes/index';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Notes',
	data () {
		return {
			title: 'Title'
		}
	},
	methods: {
		onAddNote () {
			let newNote = {}
			newNote.title = 'New note'
			newNote.body = 'Body of the content'
			NotesApi.addNote(newNote)
			console.log('on new note add')
		},
		onEditNote () {
			console.log('on edit note')
		}
	}
}
</script>