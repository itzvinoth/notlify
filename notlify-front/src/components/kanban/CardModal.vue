<template>
	<div>
		<Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal" class="card-detail__modal">
				<template #header>
					<label>Notlify / {{ columnTitle }}</label>
					<h2 @click="onCardTitleClick" v-if="!isCardTitleSelected">{{ cardDetail.title }}</h2>
					<textarea @blur="onTextareaBlur" @keypress.enter="onTextareaBlur" v-if="isCardTitleSelected" ref="cardtitle" :value="cardDetail.title" @input="onChangeCardTitle($event)">{{ cardDetail.title }}</textarea>
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
													<div>
														<input type="checkbox" :value="row.completed" :checked="row.completed" @input="onChecklistChange($event, item.id, row)" />
														<span v-if="selectedChecklistId !== row.id" class="checklist-row__item--text" :class="row.completed ? 'strike' : 'normal'" @click="onChecklistClick($event, item.id, row)">{{ row.name }}</span>
														<textarea v-if="selectedChecklistId === row.id" @blur="onChecklistBlur" class="checklist-row__item--textarea"></textarea>
													</div>
													<div>
														<!-- <vue-feather type="more-horizontal" @click.prevent.stop="showCardMenu($event, card.id)"></vue-feather> -->
														<vue-feather type="chevron-down"></vue-feather>
													</div>
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
						</div>
					</tiny-tabs>                    
				</template>
			</modal>
		</Teleport>
	</div>
</template>

<script>
let FINAL_UPDATED_CARD_TITLE = ''

import KanbanApi from '../../api/kanban/index'
import Modal from '@/components/Modal.vue';
import TinyTabs from '@/components/TinyTabs.vue';

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
			cardTitle: '',
			isCardTitleChanged: false,
			isCardTitleSelected: false,

			creatingNewSection: false,
			sectionTitle: '',
			sectionItemId: null,

			isChecklistExist: false,

			inputItem: '',
			selectedChecklistId: null
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
	watch: {
		cardTitle (newTitle, oldTitle) {
			this.isCardTitleChanged = (newTitle !== FINAL_UPDATED_CARD_TITLE) ? true : false
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
			this.isCardTitleSelected = false
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
			this.$store.dispatch('kanban/addCardSection', newChecklistSectionDetail)
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
			row['completed'] = false
			let detail = {
				'cardId': this.cardId,
				'sectionItemId': this.sectionItemId,
				'row': row
			}
			this.$store.dispatch('kanban/addSectionChecklist', detail)
			this.resetSectionChecklist()
		},
		cancelItem () {
			this.resetSectionChecklist()
		},
		resetSectionChecklist () {
			this.inputItem = ''
			this.sectionItemId = null
		},
		onCardTitleClick () {
			this.isCardTitleSelected = true
			this.cardTitle = this.cardDetail.title
			FINAL_UPDATED_CARD_TITLE = this.cardDetail.title
			this.$nextTick(() => {
				let len = this.cardTitle.length
				this.$refs.cardtitle.setSelectionRange(len, len)
				this.$refs.cardtitle.focus()
			})
		},
		onChangeCardTitle (event) {
			this.cardTitle = event.target.value
		},
		onTextareaBlur () {
			this.isCardTitleSelected = false
			if (this.isCardTitleChanged) {
				this.$nextTick(() => {
					this.cardTitleUpdate()
				})
			}
		},
		cardTitleUpdate () {
			KanbanApi.updateCard(this.cardId, {
				'title': this.cardTitle,
				'checklist': this.cardDetail.checklist
			})
			FINAL_UPDATED_CARD_TITLE = this.cardTitle
			this.$store.dispatch('kanban/getColumns')
		},
		onChecklistChange (event, itemId, row) {
			let detail = {
				'cardId': this.cardId,
				'sectionItemId': itemId,
				'rowId': row.id
			}
			this.$store.dispatch('kanban/updateSectionChecklist', detail)
		},
		onChecklistClick (event, itemId, row) {
			this.selectedChecklistId = row.id
			console.log(event, itemId, row)
		}
	}
}
</script>