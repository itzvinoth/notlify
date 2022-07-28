<template>
    <div>
        <Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal" class="card-detail__modal">
				<template #header>
					<h3>{{ cardDetail.title }}</h3>
				</template>
                <template #body>
                    <div class="row">
                        <div class="side-panel three cols">
                            <label>Add to card</label>
                            <div class="card-action__container">
                                <a class="button-action" href="#">Notes</a>
                                <a class="button-action" href="#">Checklist</a>
                                <a class="button-action" href="#">Reminder</a>
                                <a class="button-action" href="#">Color</a>
                                <a class="button-action" href="#">Attachment</a>
                            </div>
                        </div>
                        <div class="main-panel nine cols">main panel</div>
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
    methods: {
        onCloseModal () {
			this.$emit('update')
		}
    }
}
</script>