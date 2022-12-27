<template>
	<div class="kb__columns">
		<div
			class="kb__column"
			v-for="(column, index) in columns"
			:key="column.id"
			:data-id="column.id"
		>
			<div style="position: absolute; right: 30px; top: 2px;">
				<vue-feather
					type="chevron-left"
					:style="`display: ${(index === 0) ? 'none' : 'inline-block'};`"
					@click.prevent.stop="moveColumnLeft($event, column.id)"
				></vue-feather>
				<vue-feather
					type="chevron-right"
					:style="`display: ${(index === (columns.length - 1)) ? 'none' : 'inline-block'};`"
					@click.prevent.stop="moveColumnRight($event, column.id)"
				></vue-feather>
			</div>
			<popover>
				<template #trigger>
					<vue-feather
						type="more-horizontal"
						@click.prevent.stop="showColumnMenu($event, column.id)"
					></vue-feather>
				</template>
				<template #body>
					<card-dropdown
						v-if="column.id === columnId"
						:pos="'right'"
						v-click-outside="onClickingOutsideColumnMenu"
						:on-window-resize="'adjustable'"
					>
						<template #title></template>
						<template #list>
							<li><a href="" @click.prevent>Edit</a></li>
							<li>
								<a
									href=""
									@click.prevent
									@dblclick="onDblClickColumnDeleteMenu($event, column.id)"
								>Delete</a>
							</li>
						</template>
					</card-dropdown>
				</template>
			</popover>
			<div class="kb__column--title">
				<span
					style="display: block; width: 100%;"
					@click="onColumnTitleClick($event, column)"
					v-if="selectedColumnId !== column.id">
					{{ column.title }}
				</span>
				<textarea
					v-if="selectedColumnId === column.id"
					@blur="onColumnTextareaBlur($event, column)"
					@keypress.enter="onColumnTextareaBlur($event, column)"
					:value="column.title"
					@input="onColumnTextChange($event)"
					:id="`column-${column.id}-textarea`"
					class="textarea-kanban column-title__textarea"
				></textarea>
			</div>
			<card
				:cards="column.cards"
				:column-id="column.id"
				:column-title="column.title"
			/>
			<!-- <button class="kb__add-item" type="button" @click="addCard(column.id)">Add a card</button> -->
			<div class="card-composer">
				<div
					v-if="column.id !== cardComposerColumnId"
					@click="cardComposer('add', column.id)"
					class="add-card"
				>
					Add a card
				</div>
				<div
					v-if="isComposingNewCard && column.id === cardComposerColumnId"
				>
					<textarea
						class="textarea-kanban card-composer__textarea"
						v-model="newCardTitle"
						:ref="`cardtitle-${column.id}`"
						@keypress.enter="cardComposer('save', column.id)"
						placeholder="Enter a card title"
					/>
					<button
						type="button"
						@click="cardComposer('save', column.id)"
						class="save-card"
					>
						Save
					</button>
					<button
						type="button"
						@click="cardComposer('cancel')"
						class="cancel-card"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
		<div class="kb__column" style="cursor: pointer;">
			<div class="column-composer">
				<div
					v-if="!isComposingNewColumn"
					@click="columnComposer('add')"
					class="add-column"
				>
					Add another column
				</div>
				<div v-if="isComposingNewColumn">
					<textarea
						class="textarea-kanban column-composer__textarea"
						v-model="columnTitle"
						@keypress.enter="columnComposer('save')"
						placeholder="Enter a column title"
					/>
					<button
						type="button"
						@click="columnComposer('save')"
						class="save-column"
					>
						Save
					</button>
					<button
						type="button"
						@click="columnComposer('cancel')"
						class="cancel-column"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let COLUMN_TITLE = "";

import Card from "@/components/kanban/Card.vue";
import CardApi from "../../api/kanban/card/index";
import ColumnApi from "../../api/kanban/column/index";
import CardDropdown from "@/components/kanban/CardDropdown.vue";
import Popover from "@/components/Popover.vue";

import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		card: Card,
		"card-dropdown": CardDropdown,
		popover: Popover,
	},
	data() {
		return {
			columnTitle: "",
			isComposingNewColumn: false,
			selectedColumnId: null,
			isColumnTitleChanged: false,

			cardComposerColumnId: null,
			isComposingNewCard: false,
			newCardTitle: "",
			newCardId: null,
		};
	},
	computed: {
		...mapGetters("kanban", {
			columnId: "columnId",
			cardId: "cardId",
			columns: "columns",
		}),
	},

	watch: {
		columnTitle(newTitle) {
			this.isColumnTitleChanged = newTitle !== COLUMN_TITLE ? true : false;
		},
	},
	methods: {
		// COLUMN
		// Add column
		columnComposer(type) {
			switch (type) {
			case "add":
				this.isComposingNewColumn = true;
				break;
			case "save":
				this.addColumn();
				this.resetColumnComposer();
				break;
			case "cancel":
				this.resetColumnComposer();
				break;
			}
		},
		addColumn() {
			const column = {
				id: Math.floor(Math.random() * 1000),
				title: this.columnTitle,
				cards: [],
			};
			ColumnApi.insertColumn(column);
			this.$store.dispatch("kanban/getColumns");
		},
		resetColumnComposer() {
			this.isComposingNewColumn = false;
			this.columnTitle = "";
		},
		// Edit column
		onColumnTitleClick(event, column) {
			this.selectedColumnId = column.id;
			COLUMN_TITLE = column.title;
			this.$nextTick(() => {
				let len = column.title.length;
				let element = document.getElementById(`column-${column.id}-textarea`);
				element.setSelectionRange(len, len);
				element.focus();

				// this.resetColumn();
			});
		},
		onColumnTextareaBlur(event, column) {
			this.selectedColumnId = null;
			if (this.isColumnTitleChanged) {
				this.$nextTick(() => {
					this.columnTitleUpdate(column);
				});
			}
		},
		onColumnTextChange(event, column) {
			this.columnTitle = event.target.value;
		},
		columnTitleUpdate(column) {
			let updatedColumn = { ...column, title: this.columnTitle };
			ColumnApi.updateColumn(updatedColumn);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		resetColumn() {
			this.columnTitle = "";
			this.selectedColumnId = null;
		},
		moveColumnLeft (event, id) {
			let x = this.columns.map(x => x.id).indexOf(id);
			console.log('columns: ', this.columns, 'pos: ', x)
		},
		moveColumnRight (event, id) {

		},
		showColumnMenu(event, id) {
			if (this.columnId === id) {
				this.$store.dispatch("kanban/getColumnId", null);
				return;
			}
			this.$store.dispatch("kanban/getColumnId", id);
		},
		onDblClickColumnDeleteMenu(event, id) {
			let check = confirm("Are you sure you want to delete this column");
			if (check) {
				this.onDeleteColumn(id);
			};
		},
		onDeleteColumn(id) {
			ColumnApi.deleteColumn(id);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		onClickingOutsideColumnMenu() {
			if (this.columnId !== null) {
				this.$store.dispatch("kanban/getColumnId", null);
				return;
			}
		},
		// card
		cardComposer(type, columnId) {
			switch (type) {
			case "add":
				this.cardComposerColumnId = columnId;
				this.isComposingNewCard = true;
				this.newCardId = Math.floor(Math.random() * 100000);
				break;
			case "save":
				this.addCard(columnId);
				this.resetCardComposer();
				break;
			case "cancel":
				this.resetCardComposer();
				break;
			}
		},
		addCard(columnId) {
			let id = this.newCardId;
			CardApi.insertCard(columnId, id);
			CardApi.updateCard(id, {
				title: this.newCardTitle,
				checklist: [],
				color: "#FFFFFF",
				description: {
					content: "",
				},
				notes: [],
			});
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		resetCardComposer() {
			this.newCardTitle = "";
			this.newCardId = null;
			this.cardComposerColumnId = null;
		},
	},
}
</script>