<template>
	<div class="row addto-card__container">
		<div class="checklist__container">
			<div
				class="empty-checklist"
				v-if="!creatingNewSection && !isChecklistExist"
			>
				<button type="button" @click="addNewSection">
					Add section
				</button>
			</div>
			<div class="add-checklist" v-if="creatingNewSection">
				<div>
					<label>Title</label>
					<input type="text" v-model="sectionTitle" />
				</div>
				<div>
					<button type="button" @click="addChecklistItem">Add</button>
					<button type="button" @click="cancelChecklistItem">
						Cancel
					</button>
				</div>
			</div>
			<div
				class="checklist-list"
				v-if="cardDetail.checklist && cardDetail.checklist.length > 0"
			>
				<div
					class="checklist-list__item"
					v-for="(item, checklistIndex) in cardDetail.checklist"
					:key="item.id"
				>
					<div class="checklist-list__item--title">
						<h4>{{ item.sectionTitle }}</h4>
						<div class="flex">
							<div v-if="item.rows.length > 0"><input type="checkbox"><label>Hide finished items ({{ finishedChecklist(item) }})</label></div>
							<div style="margin-left: 5px;"><button type="button" @click="deleteSection($event, item)">Delete</button></div>
						</div>
					</div>
					<div class="checklist-row__container">
						<div
							class="checklist-row__item"
							v-for="(row, rowIndex) in item.rows"
							:key="rowIndex"
							:class="getPriorityClass(row.priority)"
						>
							<div class="checklist-row__item--container">
								<div class="flex">
									<input
										type="checkbox"
										:value="row.completed"
										:checked="row.completed"
										@input="onChecklistChange($event, item.id, row, 'completed')"
									/>
									<div style="width: 100%">
										<span
											v-if="selectedChecklistId !== row.id"
											@click="onChecklistClick($event, item.id, row)"
											class="checklist-row__item--text"
											:class="row.completed ? 'strike' : 'normal'">
											{{ row.name }}
										</span>
										<textarea
											v-if="selectedChecklistId === row.id"
											@blur="onChecklistTextareaBlur($event, item.id, row, 'name')"
											@keypress.enter="onChecklistTextareaBlur($event, item.id, row, 'name')"
											:value="row.name"
											@input="onChecklistTextChange($event)"
											:id="`checklist-${row.id}`"
											class="checklist-row__item--textarea"
										></textarea>
									</div>
								</div>
								<div
									v-if="selectedChecklistDropdownMenuId === row.id"
									class="checklist-dropdown__container"
								>
									<!-- Expanded -->
									<div class="checklist-dropdown">
										<div class="reminder">
											<label>Reminder</label>
											<div class="flex checklist-dropdown__value">
												<date-picker v-model="pickedDate" />
												<vue-feather
													type="check"
													@click="onUpdateReminder($event, item.id, row, 'reminder')"
													size="18"
													style="margin-left: 5px; cursor: pointer;">
												</vue-feather>
											</div>
										</div>
										<div class="priority">
											<label>Priority</label>
											<div class="checklist-dropdown__value">
												<select
													@change="onChecklistPriorityChange($event, item.id, row, 'priority')"
													:value="row.priority"
												>
													<option value="0">None</option>
													<option value="1">Low</option>
													<option value="2">Medium</option>
													<option value="3">High</option>
												</select>
											</div>
										</div>
									</div>
									<div>
										<button
											type="button"
											@click="deleteChecklistItem($event, item.id, row)">
											Delete
										</button>
									</div>
								</div>
							</div>
							<div>
								<!-- <vue-feather type="more-horizontal" @click.prevent.stop="showCardMenu($event, card.id)"></vue-feather> -->
								<vue-feather
									v-if="selectedChecklistDropdownMenuId === row.id"
									type="chevron-up"
									@click="showChecklistDropdownMenu($event, row)"
									size="18"
								>
								</vue-feather>
								<vue-feather
									v-if="selectedChecklistDropdownMenuId !== row.id"
									type="chevron-down"
									@click="showChecklistDropdownMenu($event, row)"
									size="18"
								>
								</vue-feather>
							</div>
						</div>
					</div>
					<div
						v-if="sectionItemId === item.id"
						class="new-checklist-edit__container"
					>
						<div v-if="!selectedChecklistId">
							<input
								type="text"
								v-model="checklistText"
								placeholder="Add an item"
							/>
							<div>
								<button type="button" @click="addItem(checklistIndex)">
									Add
								</button>
								<button type="button" @click="cancelItem(checklistIndex)">
									Cancel
								</button>
							</div>
						</div>
					</div>
					<button
						type="button"
						v-if="sectionItemId !== item.id || selectedChecklistId"
						@click="showItemAdd(checklistIndex, item.id)"
					>
						Add an item
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let CHECKLIST_TEXT = "";

import { mapGetters } from "vuex";

import Datepicker from "vue3-datepicker";
import CardChecklistApi from "../../api/kanban/card-checklist/index";

export default {
	components: {
		"date-picker": Datepicker,
	},
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
			creatingNewSection: false,
			sectionTitle: "",
			sectionItemId: null,

			isChecklistExist: false,

			checklistText: "",
			selectedChecklistId: null,
			selectedChecklistDropdownMenuId: null,
			isChecklistTextChanged: false,
			pickedDate: null,
		};
	},
	computed: {
		getPriorityClass() {
			let classNames = [
				"no-priority",
				"low-priority",
				"medium-priority",
				"high-priority",
			];
			return (p) => `${classNames[p]}`;
		},
		finishedChecklist() {
			return (item) => `${item.rows.filter((row) => row.completed).length}`;
		},
	},
	watch: {
		checklistText(newText) {
			this.isChecklistTextChanged = newText !== CHECKLIST_TEXT ? true : false;
		},
	},
	methods: {
		// section
		addChecklistItem() {
			let newChecklistSection = {};
			newChecklistSection["id"] = Math.floor(Math.random() * 100000000);
			newChecklistSection["sectionTitle"] = this.sectionTitle;
			newChecklistSection["rows"] = [];
			let newChecklistSectionDetail = {
				cardId: this.cardId,
				item: newChecklistSection,
			};
			CardChecklistApi.addCardSection(newChecklistSectionDetail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
			this.reset();
		},
		cancelChecklistItem() {
			this.creatingNewSection = false;
		},
		addNewSection() {
			this.creatingNewSection = true;
		},
		reset() {
			this.sectionTitle = "";
			this.creatingNewSection = false;
		},
		showItemAdd(_checklistIndex, itemId) {
			this.resetSectionChecklist();
			this.sectionItemId = itemId;
		},
		resetSectionChecklist() {
			this.checklistText = "";
			this.sectionItemId = null;
		},
		deleteSection(event, item) {
			let detail = {
				cardId: this.cardId,
				item: item,
			};
			CardChecklistApi.deleteCardSection(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		// Checklist
		addItem() {
			let row = {};
			row["id"] = Math.floor(Math.random() * 10000000000);
			row["name"] = this.checklistText;
			row["completed"] = false;
			row["reminder"] = "";
			row["priority"] = 0;
			let detail = {
				cardId: this.cardId,
				sectionItemId: this.sectionItemId,
				row: row,
			};
			CardChecklistApi.addSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
			this.resetSectionChecklist();
		},
		cancelItem() {
			this.resetSectionChecklist();
		},
		onChecklistChange(event, itemId, row, param) {
			let detail = {
				cardId: this.cardId,
				sectionItemId: itemId,
				row: row,
				param: param,
			};
			CardChecklistApi.updateSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		onChecklistTextChange(event) {
			this.checklistText = event.target.value;
		},
		onChecklistClick(event, _itemId, row) {
			this.selectedChecklistId = row.id;
			CHECKLIST_TEXT = row.name;
			this.$nextTick(() => {
				let len = row.name.length;
				let element = document.getElementById(`checklist-${row.id}`);
				element.setSelectionRange(len, len);
				element.focus();

				this.resetSectionChecklist();
			});
		},
		showChecklistDropdownMenu(event, row) {
			if (this.selectedChecklistDropdownMenuId === row.id) {
				this.selectedChecklistDropdownMenuId = null;
				this.pickedDate = null;
				return;
			}
			this.selectedChecklistDropdownMenuId = row.id;
			this.pickedDate = row.reminder ? new Date(row.reminder) : null;
		},
		onChecklistTextareaBlur(event, itemId, row, param) {
			this.selectedChecklistId = null;
			if (this.isChecklistTextChanged) {
				this.$nextTick(() => {
					this.checklistTextUpdate(itemId, row, param);
				});
			}
		},
		checklistTextUpdate(itemId, row, param) {
			let updatedRow = { ...row, name: this.checklistText };
			let detail = {
				cardId: this.cardId,
				sectionItemId: itemId,
				row: updatedRow,
				param: param,
			};
			CardChecklistApi.updateSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		deleteChecklistItem(event, itemId, row) {
			let detail = {
				cardId: this.cardId,
				sectionItemId: itemId,
				rowId: row.id,
			};
			CardChecklistApi.deleteSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		onChecklistPriorityChange(event, itemId, row, param) {
			let updatedRow = { ...row, priority: event.target.value };
			let detail = {
				cardId: this.cardId,
				sectionItemId: itemId,
				row: updatedRow,
				param: param,
			};
			CardChecklistApi.updateSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
		onUpdateReminder(event, itemId, row, param) {
			let formattedDate = this.pickedDate.toISOString().slice(0, 10);
			let updatedRow = { ...row, reminder: formattedDate };
			let detail = {
				cardId: this.cardId,
				sectionItemId: itemId,
				row: updatedRow,
				param: param,
			};
			CardChecklistApi.updateSectionChecklist(detail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		},
	},
};
</script>
