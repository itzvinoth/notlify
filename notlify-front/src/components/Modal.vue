<template>
	<Transition name="modal">
		<div v-if="show" class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container" ref="target">
					<div class="modal-header">
						<slot name="header">default header</slot>
					</div>

					<div class="modal-body">
						<slot name="body">default body</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							default footer
							<button
								class="modal-default-button"
								@click="$emit('close')"
							>OK</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
import { ref } from 'vue'
// https://vueuse.org/core/onclickoutside/#onclickoutside
import { onClickOutside } from "@vueuse/core";

const modal = ref(null)

export default {
	name: 'Modal',
	props: {
		show: Boolean
	},
	setup (props, contenxt) {
		// https://vuejs.org/api/composition-api-setup.html#setup-context
		const target = ref(null)
		onClickOutside(target, (event) => {
			contenxt.emit('close')
		})

		return { target }
	}
}
</script>
