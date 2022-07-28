<template>
    <div>
        <Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="onCloseModal">
				<template #header>
					<h3>{{ cardDetail.title }}</h3>
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