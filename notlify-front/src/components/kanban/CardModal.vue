<template>
    <div>
        <Teleport to="body">
			<!-- use the modal component, pass in the prop -->
			<modal :show="show" @close="closeModal">
				<template #header>
					<h3>custom header</h3>
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
        }
    },
    methods: {
        closeModal () {
			this.$emit('update')
		}
    }
}
</script>