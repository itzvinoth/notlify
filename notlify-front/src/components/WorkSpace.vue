<template>
	<div class="workspace">
		<Transition>
			<div v-if="!isEditingTitle">
				<span @click="handleEditTitle('edit')" class="workspace-title">{{ workspaceTitle }}</span>
			</div>
			<div v-else>
				<input type="text" v-model="workspaceTitle" @keypress.enter="handleEditTitle('save')" />
				<div @click="handleEditTitle('save')">Save</div>
			</div>
		</Transition>
	</div>
</template>

<script>
export default {
	name: 'WorkSpace',
	data () {
		return {
			workspaceTitle: 'Board title',
			isEditingTitle: false
		}
	},
	methods: {
		handleEditTitle (type) {
			if (type === 'edit') {
				this.isEditingTitle = true
			} else if (type === 'save') {
				this.isEditingTitle = false
			}
		}
	},
}
</script>