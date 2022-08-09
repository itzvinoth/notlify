<template>
	<div>
		<Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal" class="card-detail__modal">
				<template #header>
					<label>Netlify / {{ columnTitle }}</label>
					<h2>{{ cardDetail.title }}</h2>
					<!-- {{ cardDetail }} -->
				</template>
				<template #body>
					<tiny-tabs id="mytabs" :anchor="false" :closable="false" :hideTitle="false" @on-close="onClose" @on-before="onBefore" @on-after="onAfter">
						<div class="section" id="description">
							<h3 class="title">Description</h3>
							<h3>Tinymce</h3>
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
									<div class="checklist-list" v-if="checklistItems.length > 0">
										<div class="checklist-list__item" v-for="(item, checklistIndex) in checklistItems" :key="item.id">
											<h4>{{ item.sectionTitle }}</h4>
											<div class="checklist-row__container">
												<div class="checklist-row__item" v-for="(row, rowIndex) in item.rows" :key="rowIndex">
													<div><input type="checkbox" /> {{ row }}</div>
												</div>
											</div>
											<div v-if="item.showEdit" class="new-checklist-edit__container">
												<div><input type="text" v-model="item.input" placeholder="Add an item" /></div>
												<button type="button" @click="addItem(checklistIndex)">Add</button>
											</div>
											<button v-if="!item.showEdit" @click="showItemAdd(checklistIndex)">Add an item</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="section" id="notes">
							<h3 class="title">Notes</h3>
							<h3>Notes UI should add</h3>
						</div>
					</tiny-tabs>                    
				</template>
			</modal>
		</Teleport>
	</div>
</template>

<script>
import KanbanApi from "../../api/index"
import Modal from "@/components/Modal.vue";
import TinyTabs from "@/components/TinyTabs.vue";

export default {
	components: {
		Modal,
		'tiny-tabs': TinyTabs
	},
	props: {
		show: {
			type: Boolean
		},
		cardDetail: {
			type: Object
		},
		columnTitle: {
			type: String
		}
	},
	data () {
		return {
			isChecklistExist: false,
			creatingNewSection: false,
			sectionTitle: '',
			checklistItems: []
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
		},
		addNewSection () {
			this.creatingNewSection = true
		},
		addChecklistItem () {
			let detail = {}
			detail.sectionTitle = this.sectionTitle
			detail.id = Math.floor(Math.random() * 100000000)
			detail.rows = []
			detail.showEdit = false
			detail.input = ''
			this.checklistItems.push(detail)
			this.reset()
			console.log(this.checklistItems)
			// let id = this.cardDetail.id
			// KanbanApi.updateCard(id, {
			// 	'checklist': this.checklistItems
			// })
		},
		cancelChecklistItem () {
			this.creatingNewSection = false
		},
		reset () {
			this.sectionTitle = ''
			this.creatingNewSection = false
		},
		showItemAdd (checklistIndex) {
			let checklistItems = this.checklistItems[checklistIndex]
			checklistItems['showEdit'] = true
		},
		addItem (checklistIndex) {
			let checklistItems = this.checklistItems[checklistIndex]
			let rows = checklistItems['rows']
			let input = checklistItems['input']
			rows.push(input)
			this.$nextTick(() => {
				this.checklistItems[checklistIndex]['input'] = ''
			})
		}
	}
}
</script>