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
					v-model="title"
					@blur="onEditNote"
				/>
			</div>
			<div class="notes-editor__body">
				<textarea @blur="onEditNote">Body of the content</textarea>
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
			title: "Title",
			selectedNoteId: "",
		};
	},
	created() {
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
			this.selectedNoteId = note.id
		},
		onSaveNote() {

		},
		onEditNote() {
			console.log("on edit note");
		},
	},
};
</script>
