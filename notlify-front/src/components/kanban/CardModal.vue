<!-- eslint-disable prettier/prettier -->
<template>
	<div>
		<Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal
				:show="show"
				@close="onCloseModal"
				class="card-detail__modal"
			>
				<template #header>
					<label>Notlify / {{ columnTitle }}</label>
					<h2 @click="onCardTitleClick" v-if="!isCardTitleSelected">{{ cardDetail.title }}</h2>
					<textarea
						@blur="onCardTextareaBlur(cardDetail)"
						@keypress.enter="onCardTextareaBlur(cardDetail)"
						v-if="isCardTitleSelected"
						ref="cardtitle"
						:value="cardDetail.title"
						@input="onChangeCardTitle($event)"
					>
						{{ cardDetail.title }}
					</textarea>
					<div class="color-picker__container">
						<popover>
							<template #trigger>
								<div
									class="trigger-container"
									@click.prevent.stop="showColorPalette($event)"
									:style="{ 'background': cardDetail.color }"
								/>
							</template>
							<template #body>
								<card-dropdown
									v-if="isColorPaletteShown"
									:pos="'left'"
									v-click-outside="onClickingOutsideColorPalette"
									:on-window-resize="'adjustable'"
								>
									<template #title></template>
									<template #body>
										<div>
											<ul class="colors">
												<li
													v-for="item in colors"
													:key="item"
													class="item"
													@click="cardColorUpdate(item, cardDetail)"
												>
													<div
														:style="{ 'background': item }"
														class="color"
														:class="(item === cardDetail.color) ? 'choosen-color' : ''"
													/>
												</li>
											</ul>
										</div>
									</template>
								</card-dropdown>
							</template>
						</popover>
					</div>
					<div class="tags-container">
						<div
							class="tags"
							v-for="tag in cardDetail.tags"
							:key="tag.name"
							:style="{'border': `2px dashed ${tag.color}`, 'color': `${tag.color}`}"
							@click="editTag(tag)"
						>{{ tag.name }}<span style="padding: 2px; margin-left: 5px;" @click.stop="deleteTag(tag)">&#x2715;</span></div>
						<div class="tags" @click="addTag">{{cardDetail.tags.length > 0 ? '&plus;' : '+ Add tag'}}</div>
					</div>
					<card-dropdown
						v-if="isTagsAddModalShown"
						:pos="'down'"
						:on-window-resize="'adjustable'"
						class="tags-dropdown"
					>
						<template #title>
							<div style="display: flex; justify-content: space-between;">
								<div><h3>New tag</h3></div>
								<div @click="onCloseNewTag" style="cursor: pointer;"><span style="padding: 2px; border: 1px solid #ccc;">&#x2715;</span></div>
							</div>
						</template>
						<template #body>
							<div style="display: flex; justify-content: space-between;">
								<div class="tag-name">
									<input type="text" v-model="tagName" style="width: 100px;" />
								</div>
								<div class="tag-color">
									<div>
										<ul class="tag-color__list flex">
											<li v-for="color in tagColors" :key="`tag-${color}`" @click="addTagColor(color)" style="margin-right: 4px;">
												<div
													:style="{ 'background': color }"
													style="height: 20px; width: 20px; cursor: pointer;"
													class="color"
													:class="(color === tagColor) ? 'choosen-color' : ''"
												/>
											</li>
										</ul>
									</div>
								</div>
								<div class="tag-button">
									<button
										type="button"
										@click="addTagDetail"
										class="add-tag__button"
									>
										Add tag
									</button>
								</div>
							</div>
						</template>
					</card-dropdown>
					<card-dropdown
						v-if="isTagsEditModalShown"
						:pos="'down'"
						:on-window-resize="'adjustable'"
						class="tags-dropdown"
					>
						<template #title>
							<div style="display: flex; justify-content: space-between;">
								<div><h3>Edit tag</h3></div>
								<div @click="onCloseEditTag" style="cursor: pointer;"><span style="padding: 2px; border: 1px solid #ccc;">&#x2715;</span></div>
							</div>
						</template>
						<template #body>
							<div style="display: flex; justify-content: space-between;">
								<div class="tag-name">
									<input type="text" v-model="editedTagName" style="width: 100px;" />
								</div>
								<div class="tag-color">
									<div>
										<ul class="tag-color__list flex">
											<li v-for="color in tagColors" :key="`tag-${color}`" @click="editTagColor(color)" style="margin-right: 4px;">
												<div
													:style="{ 'background': color }"
													style="height: 20px; width: 20px; cursor: pointer;"
													class="color"
													:class="(color === editedTagColor) ? 'choosen-color' : ''"
												/>
											</li>
										</ul>
									</div>
								</div>
								<div class="tag-button">
									<button
										type="button"
										@click="updateTagDetail"
										class="add-tag__button"
									>
										Edit tag
									</button>
								</div>
							</div>
						</template>
					</card-dropdown>
				</template>
				<template #body>
					<tiny-tabs
						id="mytabs"
						:anchor="false"
						:closable="false"
						:hideTitle="false"
						@on-close="onClose"
						@on-before="onBefore"
						@on-after="onAfter"
					>
						<div class="section" id="description">
							<h3 class="title">Description</h3>
							<card-description :card-detail="cardDetail" :card-id="cardId"></card-description>
						</div>
						<div class="section" id="checklist" default>
							<h3 class="title">Checklist</h3>
							<card-checklist :card-detail="cardDetail" :card-id="cardId"></card-checklist>
						</div>
						<div class="section" id="notes">
							<h3 class="title">Notes</h3>
							<card-notes :card-detail="cardDetail" :card-id="cardId"></card-notes>
						</div>
					</tiny-tabs>
				</template>
			</modal>
		</Teleport>
	</div>
</template>

<script>
let CARD_TITLE = "";

import CardApi from "../../api/kanban/card/index";
import CardTagsApi from "../../api/kanban/card-tags/index";
import Modal from "@/components/Modal.vue";
import TinyTabs from "@/components/TinyTabs.vue";
import CardChecklist from "@/components/card-modal/CardChecklist.vue";
import CardDescription from "@/components/card-modal/CardDescription.vue";
import CardNotes from "@/components/card-modal/CardNotes.vue";
import Popover from "@/components/Popover.vue";
import CardDropdown from "@/components/kanban/CardDropdown.vue";

import { mapGetters } from "vuex";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
	components: {
		Modal,
		"tiny-tabs": TinyTabs,
		QuillEditor,
		"card-checklist": CardChecklist,
		"card-description": CardDescription,
		"card-notes": CardNotes,
		"popover": Popover,
		"card-dropdown": CardDropdown,
	},
	props: {
		show: {
			type: Boolean,
		},
		columnTitle: {
			type: String,
		},
		cardId: {
			type: Number,
		},
	},
	data() {
		return {
			cardTitle: "",
			isCardTitleChanged: false,
			isCardTitleSelected: false,
			isColorPaletteShown: false,
			colors: ["#FFFFFF", "#BEB7DF", "#EF959D", "#66A182", "#EEE5BF", "#F6AF65"],
			selectedColor: "#FFFFFF",
			
			isTagsAddModalShown: false,
			isTagsEditModalShown: false,
			
			tagName: "",
			tagColor: "",
			tagColors: ["#BEB7DF", "#EF959D", "#66A182", /* "#EEE5BF",*/ "#F6AF65"],

			editedTagId: "",
			editedTagName: "",
			editedTagColor: "",
		};
	},
	computed: {
		...mapGetters("kanban", {
			columns: "columns",
		}),
		cardDetail() {
			const [card, currentColumn] = (() => {
				for (const column of this.columns) {
					const card = column.cards.find(
						(card) => card.id === this.cardId
					);

					if (card) {
						return [card, column];
					}
				}
			})();
			return card;
		},
	},
	watch: {
		cardTitle(newTitle) {
			this.isCardTitleChanged = newTitle !== CARD_TITLE ? true : false;
		},
	},
	methods: {
		// modal
		onCloseModal() {
			this.$emit("update");
			// this.resetSectionChecklist();
			this.isCardTitleSelected = false;
		},
		// tabs
		onClose(id) {
			console.log("Callback function that gets evaluated while closing the tab", id);
		},
		onBefore(id, tab) {
			console.log("Callback function that gets evaluated before a tab is activated", id, tab);
		},
		onAfter(id, tab) {
			console.log("Callback function that gets evaluated after a tab is activated", id, tab);
		},
		// card
		onCardTitleClick() {
			this.isCardTitleSelected = true;
			this.cardTitle = this.cardDetail.title;
			CARD_TITLE = this.cardDetail.title;
			this.$nextTick(() => {
				let len = this.cardTitle.length;
				this.$refs.cardtitle.setSelectionRange(len, len);
				this.$refs.cardtitle.focus();
			});
		},
		onChangeCardTitle(event) {
			this.cardTitle = event.target.value;
		},
		onCardTextareaBlur(cardDetail) {
			this.isCardTitleSelected = false;
			if (this.isCardTitleChanged) {
				this.$nextTick(() => {
					this.cardTitleUpdate(cardDetail);
				});
			}
		},
		cardTitleUpdate(cardDetail) {
			let updatedCard = {...cardDetail, ...{title: this.cardTitle}};
			CardApi.updateCard(this.cardId, updatedCard);
			CARD_TITLE = this.cardTitle;
			this.$store.dispatch("kanban/getColumns");
		},
		showColorPalette () {
			this.isColorPaletteShown = !this.isColorPaletteShown;
		},
		onClickingOutsideColorPalette () {
			this.isColorPaletteShown = false;
		},
		cardColorUpdate (item, cardDetail) {
			this.selectedColor = item;
			let updatedCard = {...cardDetail, ...{color: this.selectedColor}};
			CardApi.updateCard(this.cardId, updatedCard);
			this.$store.dispatch("kanban/getColumns");
		},
		addTag () {
			this.isTagsAddModalShown = true;
		},
		onCloseNewTag () {
			this.isTagsAddModalShown = false;
		},
		addTagColor (color) {
			this.tagColor = color;
		},
		addTagDetail () {
			let tag = {};
			tag.id = Math.floor(Math.random() * 10000000);
			tag.name = this.tagName;
			tag.color = this.tagColor;
			let tagDetail = {
				cardId: this.cardId,
				item: tag,
			};
			CardTagsApi.addCardTag(tagDetail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
			this.isTagsAddModalShown = false;
			this.resetTagsDetail()
		},
		resetTagsDetail () {
			this.tagName = "";
			this.tagColor = "";
		},
		editTag (tag) {
			this.isTagsEditModalShown = true;
			this.editedTagName = tag.name;
			this.editedTagId = tag.id;
			this.editedTagColor = tag.color;
		},
		onCloseEditTag () {
			this.isTagsEditModalShown = false;
		},
		editTagColor (color) {
			this.editedTagColor = color;
		},
		updateTagDetail () {
			let tag = {};
			tag.id = this.editedTagId;
			tag.name = this.editedTagName;
			tag.color = this.editedTagColor;
			let tagDetail = {
				cardId: this.cardId,
				item: tag,
			};
			CardTagsApi.updateCardTag(tagDetail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
			this.isTagsEditModalShown = false;
			this.resetEditTagsDetail()
		},
		resetEditTagsDetail () {
			this.editedTagName = "";
			this.editedTagColor = "";
		},
		deleteTag (tag) {
			let tagDetail = {
				cardId: this.cardId,
				item: tag,
			};
			CardTagsApi.deleteCardTag(tagDetail);
			// vuex commit update kanban
			this.$store.dispatch("kanban/getColumns");
		}
	},
};
</script>
