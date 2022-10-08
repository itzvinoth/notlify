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
						@blur="onCardTextareaBlur"
						@keypress.enter="onCardTextareaBlur"
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
								<vue-feather
									type="more-horizontal"
									@click.prevent.stop="showColorPalette($event)"
								></vue-feather>
							</template>
							<template #body>
								<card-dropdown
									v-if="isColorPaletteShown"
									:pos="'left'"
									v-click-outside="onClickingOutsideColorPalette"
									:on-window-resize="'adjustable'"
								>
									<template #title></template>
									<template #list>
										color list
									</template>
								</card-dropdown>
							</template>
						</popover>
					</div>
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

import KanbanApi from "../../api/kanban/index";
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
		onCardTextareaBlur() {
			this.isCardTitleSelected = false;
			if (this.isCardTitleChanged) {
				this.$nextTick(() => {
					this.cardTitleUpdate();
				});
			}
		},
		cardTitleUpdate() {
			KanbanApi.updateCard(this.cardId, {
				title: this.cardTitle,
			});
			CARD_TITLE = this.cardTitle;
			this.$store.dispatch("kanban/getColumns");
		},
		showColorPalette () {
			this.isColorPaletteShown = !this.isColorPaletteShown
		},
	},
};
</script>
