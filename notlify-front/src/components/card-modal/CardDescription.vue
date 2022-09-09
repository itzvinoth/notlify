<template>
	<div>
		<QuillEditor theme="snow" />
	</div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
	name: "CardDescription",
	components: {
		QuillEditor,
	},
	data() {
		return {

		}
	}
};
</script>
