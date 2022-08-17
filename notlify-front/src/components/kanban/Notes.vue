<template>
	<div class="notes">
		<div class="notes-sidebar">
			<button class="note-add--btn" @click="onAddNote">+ Add a note</button>
			<div class="notes-list">
				<div class="notes-list__item" v-for="note in notes" :key="note.id">
					<div class="notes-title">{{ note.title }}</div>
					<div class="notes-body">{{ note.body }}</div>
					<div class="notes-updated">{{ new Date(note.updated).toLocaleString() }}</div>
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
	computed: {
		...mapGetters('notes', {
			notes: 'notes'
		})
	},
	created () {
		this.$store.dispatch('notes/getNotes')
	},
	methods: {
		onAddNote () {
			let newNote = {}
			newNote.title = 'New note'
			newNote.body = 'Body of the content'
			NotesApi.addNote(newNote)
			this.$store.dispatch('notes/getNotes')
		},
		onEditNote () {
			console.log('on edit note')
		}
	}
}
</script>