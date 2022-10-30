<template>
	<div
		class="kb__dropzone"
		@dragover="onDragOver"
		@dragenter="onDragEnter"
		@dragleave="onDragLeave"
		@drop="onDrop"
	></div>
</template>

<script>
import CardApi from "../../api/kanban/card/index";
import { mapGetters } from "vuex";

export default {
	name: "DropZone",
	props: {
		cardId: {
			type: Number,
		},
	},
	computed: {
		...mapGetters("kanban", {
			draggingElemHeight: "draggingElemHeight",
		}),
	},
	methods: {
		onDragEnter(event) {
			event.preventDefault();
			event.target.classList.add("placeholder");
			event.target.style.height = `${this.draggingElemHeight}px`;
		},
		onDragOver(event) {
			// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
			event.preventDefault();
			event.target.style.height = `${this.draggingElemHeight}px`;
		},
		onDragLeave(event) {
			event.target.style.height = "8px";
			event.target.classList.remove("placeholder");
		},
		onDrop(event) {
			// On drop - Prevent the browser default handling of the data
			event.preventDefault();
			event.target.style.height = "8px";
			event.target.classList.remove("placeholder");

			let columnElement = event.target.closest(".kb__column");
			let columnId = Number(columnElement.dataset.id);

			let dropZonesInColumn = Array.from(
				columnElement.querySelectorAll(".kb__dropzone")
			);

			// to get position in the column
			let droppedIndex = dropZonesInColumn.indexOf(event.target);

			let cardId = Number(event.dataTransfer.getData("text/plain"));

			// kb-card__container contains data-id attribute
			let droppedItemElement = document.querySelector(
				`[data-id="${cardId}"]`
			);

			const insertAfter =
				event.target.previousSibling &&
				event.target.previousSibling.classList.contains("kb__card")
					? event.target.previousSibling.parentElement
					: event.target;

			// we should exit, if dragging element agains drops into the same place.
			if (droppedItemElement.contains(event.target)) {
				return;
			}

			// updating the UI
			insertAfter.after(droppedItemElement);
			CardApi.updateCard(cardId, {
				columnId,
				position: droppedIndex,
			});
		},
	},
};
</script>
