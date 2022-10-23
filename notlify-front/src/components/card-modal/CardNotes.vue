<template>
	<div class="notes">
		<div class="notes-sidebar">
			<button type="button" class="note-add--btn" @click="onAddNote">
				+ Add new note
			</button>
			<div class="notes-list">
				<div
					class="notes-list__item"
					:class="selectedNoteId === note.id ? 'notes-list__item--selected' : ''"
					v-for="note in cardDetail.notes"
					:key="note.id"
					@click="onSelectNote(note)"
				>
					<div class="note-title">{{ note.title }}</div>
					<div class="note-body">{{ note.body }}</div>
					<div class="note-updated">
						{{ new Date(note.updated).toLocaleString() }}
					</div>
				</div>
			</div>
		</div>
		<div class="notes-editor">
			<div class="notes-editor__title">
				<input
					type="text"
					placeholder="Enter a title"
					v-model="noteTitle"
					@blur="onEditNote"
				/>
			</div>
			<div class="notes-editor__body">
				<textarea @blur="onEditNote" v-model="noteContent">Body of the content</textarea>
				<button type="button" style="float: right;" @click="onSaveNote">
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import CardNotesApi from "../../api/kanban/card-notes";

export default {
	name: "Notes",
	props: {
		cardId: {
			type: Number,
		},
		cardDetail: {
			type: Object,
		},
	},
	data() {
		return {
			noteTitle: "Title",
			noteContent: "Body of the content",
			selectedNoteId: "",
		};
	},
	created() {
		let notes = this.cardDetail.notes;
		let selectedNote = notes[0];
		this.selectedNoteId = selectedNote["id"];
		this.noteTitle = selectedNote["title"];
		this.noteContent = selectedNote["body"];
		this.$store.dispatch("notes/getNotes");
	},
	methods: {
		onAddNote() {
			let newNote = {};
			newNote["id"] = Math.floor(Math.random() * 100000000);
			newNote["title"] = "New note";
			newNote["body"] = "Body of the content";
			newNote["updated"] = new Date();
			let newNoteDetail = {
				cardId: this.cardId,
				item: newNote,
			};
			CardNotesApi.addCardNote(newNoteDetail);
			this.$store.dispatch("kanban/getColumns");
		},
		onSelectNote(note) {
			this.selectedNoteId = note.id;
			let notes = this.cardDetail.notes
			let selectedNote = notes.find(n => n.id === this.selectedNoteId);
			this.noteTitle = selectedNote.title;
			this.noteContent = selectedNote.body;
		},
		onSaveNote() {
			let updatedNote = {};
			updatedNote["id"] = this.selectedNoteId;
			updatedNote["title"] = this.noteTitle;
			updatedNote["body"] = this.noteContent;
			updatedNote["updated"] = new Date();
			let selectedNoteDetail = {
				cardId: this.cardId,
				item: updatedNote,
			};
			CardNotesApi.updateCardNote(selectedNoteDetail);
			this.$store.dispatch("kanban/getColumns");
		},
		onEditNote() {
			console.log("on edit note");
		},
	},
};
</script>
