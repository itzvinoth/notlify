<template>
    <div>
        <Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal" class="card-detail__modal">
				<template #header>
                    <label>Netlify / More to try</label>
					<h2>{{ cardDetail.title }}</h2>
				</template>
                <template #body>
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
                                    <input type="text" v-model="checklistTitle"/>
                                </div>
                                <div>
                                    <button @click="addChecklistItem">Add</button>
                                    <button @click="cancelChecklistItem">Cancel</button>
                                </div>
                            </div>
                            <div class="checklist-list" v-if="checklistItems.length > 0">
                                <div class="checklist-list__item" v-for="(item, checklistIndex) in checklistItems" :key="item.id">
                                    <div>{{ item.title }}</div>
                                    <div class="checklist-row__container">
                                        <div class="checklist-row__item" v-for="(row, rowIndex) in item.rows" :key="rowIndex">
                                            <div><input type="checkbox" /> {{ row }}</div>
                                        </div>
                                    </div>
                                    <div class="new-checklist-edit__container" v-if="item.showEdit">
                                        <div><input type="text" v-model="item.input" placeholder="Add an item" /></div>
                                        <button type="button" @click="addItem(checklistIndex)">Add</button>
                                    </div>
                                    <button v-if="!item.showEdit" @click="showItemAdd(checklistIndex)">Add an item</button>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="side-panel three cols">
                            <label>Add to card</label>
                            <div class="card-action__container">
                                <a class="button-action" href="#">Notes</a>
                                <a class="button-action" href="#">Checklist</a>
                                <a class="button-action" href="#">Reminder</a>
                                <a class="button-action" href="#">Color</a>
                                <a class="button-action" href="#">Attachment</a>
                            </div>
                        </div>
                        <div class="main-panel nine cols">main panel</div> -->
                    </div>
                </template>
			</modal>
		</Teleport>
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
    components: {
        Modal
    },
    props: {
        show: {
            type: Boolean
        },
        cardDetail: {
            type: Object
        }
    },
    data () {
        return {
            isChecklistExist: false,
            creatingNewSection: false,
            checklistTitle: '',
            checklistItems: []
        }
    },
    methods: {
        onCloseModal () {
			this.$emit('update')
		},
        addNewSection () {
            this.creatingNewSection = true
        },
        addChecklistItem () {
            let detail = {}
            detail.title = this.checklistTitle
            detail.id = Math.floor(Math.random() * 100000000)
            detail.rows = []
            detail.showEdit = false
            detail.input = ''
            this.checklistItems.push(detail)
            this.reset()
        },
        cancelChecklistItem () {
            this.creatingNewSection = false
        },
        reset () {
            this.checklistTitle = ''
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