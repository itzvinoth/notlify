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
                            <div class="empty-checklist" v-if="!creatingNewChecklist && !isChecklistExist">
                                <button
                                    @click="addNewChecklist"
                                >Add checklist</button>
                            </div>
                            <div class="add-checklist" v-if="creatingNewChecklist">
                                <div>
                                    <label>Title</label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <button @click="addChecklistItem">Add</button>
                                    <button @click="cancelChecklistItem">Cancel</button>
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
            creatingNewChecklist: false
        }
    },
    methods: {
        onCloseModal () {
			this.$emit('update')
		},
        addNewChecklist () {
            this.creatingNewChecklist = true
            console.log('add checklist')
        },
        addChecklistItem () {},
        cancelChecklistItem () {
            this.creatingNewChecklist = false
        },
    }
}
</script>