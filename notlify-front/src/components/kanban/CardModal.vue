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
						</div>
					</tiny-tabs>
				</template>
			</modal>
		</Teleport>
	</div>
</template>

<script>
let UPDATED_CARD_TITLE = "";

import KanbanApi from "../../api/kanban/index";
import Modal from "@/components/Modal.vue";
import TinyTabs from "@/components/TinyTabs.vue";
import CardChecklist from "@/components/card-modal/CardChecklist.vue";
import CardDescription from "@/components/card-modal/CardDescription.vue";

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
			this.isCardTitleChanged = newTitle !== UPDATED_CARD_TITLE ? true : false;
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
			UPDATED_CARD_TITLE = this.cardDetail.title;
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
				checklist: this.cardDetail.checklist,
			});
			UPDATED_CARD_TITLE = this.cardTitle;
			this.$store.dispatch("kanban/getColumns");
		},
	},
};
</script>
