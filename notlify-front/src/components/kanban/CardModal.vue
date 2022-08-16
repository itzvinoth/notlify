<template>
	<div>
		<Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal" class="card-detail__modal">
				<template #header>
					<label>Notlify / {{ columnTitle }}</label>
					<h2>{{ cardDetail.title }}</h2>
				</template>
				<template #body>
					<tiny-tabs id="mytabs" :anchor="false" :closable="false" :hideTitle="false" @on-close="onClose" @on-before="onBefore" @on-after="onAfter">
						<div class="section" id="description">
							<h3 class="title">Description</h3>
							<QuillEditor theme="snow" />
						</div>
						<div class="section" id="checklist" default>
							<h3 class="title">Checklist</h3>
							<div class="row addto-card__container">
								<div class="checklist__container">
									<div class="empty-checklist" v-if="!creatingNewSection && !isChecklistExist">
										<button
											@click="addNewSection"
										>Add section</button>
									</div>
									<div class="add-checklist" v-if="creatingNewSection">
										<div>
											<label>Title</label>
											<input type="text" v-model="sectionTitle"/>
										</div>
										<div>
											<button @click="addChecklistItem">Add</button>
											<button @click="cancelChecklistItem">Cancel</button>
										</div>
									</div>
									<div class="checklist-list" v-if="cardDetail.checklist && cardDetail.checklist.length > 0">
										<div class="checklist-list__item" v-for="(item, checklistIndex) in cardDetail.checklist" :key="item.id">
											<h4>{{ item.sectionTitle }}</h4>
											<div class="checklist-row__container">
												<div class="checklist-row__item" v-for="(row, rowIndex) in item.rows" :key="rowIndex">
													<div><input type="checkbox" /> {{ row.name }}</div>
												</div>
											</div>
											<div v-if="sectionItemId === item.id" class="new-checklist-edit__container">
												<div><input type="text" v-model="inputItem" placeholder="Add an item" /></div>
												<button type="button" @click="addItem(checklistIndex)">Add</button>
												<button type="button" @click="cancelItem(checklistIndex)">Cancel</button>
											</div>
											<button v-if="sectionItemId !== item.id" @click="showItemAdd(checklistIndex, item.id)">Add an item</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="section" id="notes">
							<h3 class="title">Notes</h3>
							<!-- <div class="notes">
								<div class="notes-sidebar">
									<button class="note-add--btn">+ Add a note</button>
									<div class="notes-list">
										<div class="notes-list__item">
											<div class="notes-title">Title</div>
											<div class="notes-body">Body on the contents</div>
											<div class="notes-updated">5th Aug, 2022</div>
										</div>
									</div>
								</div>
								<div class="notes-editor">
									<div class="notes-editor__title">Title</div>
									<div class="notes-editor__body">
										Body of the content
									</div>
								</div>
							</div> -->
						</div>
					</tiny-tabs>                    
				</template>
			</modal>
		</Teleport>
	</div>
</template>

<script>
import KanbanApi from "../../api/kanban/index"
import Modal from "@/components/Modal.vue";
import TinyTabs from "@/components/TinyTabs.vue";

import { mapGetters, mapActions } from 'vuex';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
	components: {
		Modal,
		'tiny-tabs': TinyTabs,
		QuillEditor
	},
	props: {
		show: {
			type: Boolean
		},
		columnTitle: {
			type: String
		},
		cardId: {
			type: Number
		}
	},
	data () {
		return {
			isChecklistExist: false,
			creatingNewSection: false,
			sectionTitle: '',
			sectionItemId: null,
			inputItem: ''
		}
	},
	computed: {
		...mapGetters('kanban', {
			columns: 'columns'
		}),
		cardDetail () {
			const [card, currentColumn] = (() => {
				for (const column of this.columns) {
					const card = column.cards.find(card => card.id === this.cardId)

					if (card) {
						return [card, column]
					}
				}
			})()
			return card
		}
	},
	methods: {
		onClose (id) {
			console.log('Callback function that gets evaluated while closing the tab', id)
		},
		onBefore (id, tab) {
			console.log('Callback function that gets evaluated before a tab is activated', id, tab)
		},
		onAfter (id, tab) {
			console.log('Callback function that gets evaluated after a tab is activated', id, tab)
		},
		onCloseModal () {
			this.$emit('update')
			this.resetSectionChecklist()
		},
		addNewSection () {
			this.creatingNewSection = true
		},
		addChecklistItem () {
			let newChecklistSection = {}
			newChecklistSection['id'] = Math.floor(Math.random() * 100000000)
			newChecklistSection['sectionTitle'] = this.sectionTitle
			newChecklistSection['rows'] = []			
			let newChecklistSectionDetail = {
				'cardId': this.cardId,
				'item': newChecklistSection
			}
			this.$store.dispatch('kanban/updateCardSection', newChecklistSectionDetail)
			this.reset()
		},
		cancelChecklistItem () {
			this.creatingNewSection = false
		},
		reset () {
			this.sectionTitle = ''
			this.creatingNewSection = false
		},
		showItemAdd (checklistIndex, itemId) {
			this.sectionItemId = itemId
		},
		addItem (checklistIndex) {
			let row = {}
			row['id'] = Math.floor(Math.random() * 10000000000)
			row['name'] = this.inputItem
			let detail = {
				'cardId': this.cardId,
				'sectionItemId': this.sectionItemId,
				'row': row
			}
			this.$store.dispatch('kanban/updateSectionChecklist', detail)
			this.resetSectionChecklist()
		},
		cancelItem () {
			this.resetSectionChecklist()
		},
		resetSectionChecklist () {
			this.inputItem = ''
			this.sectionItemId = null
		}
	}
}
</script>