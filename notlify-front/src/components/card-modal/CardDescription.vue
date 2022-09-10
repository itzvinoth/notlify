<template>
	<div>
		<quill-editor
			theme="snow"
			ref="editor"
			content-type="html"
			v-model:content="content"
			@blur="onblur($event)"
		/>
	</div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
	name: "CardDescription",
	components: {
		"quill-editor": QuillEditor,
	},
	props: {
		cardId: {
			type: Number,
		},
		cardDetail: {
			type: Object,
		},
	},
	data () {
		return {
			content: "<h1>hola</h1><br><h2>hello</h2>"
		}
	},
	methods: {
		onblur (event) {
			let el = event.value;
			let el2 = el.querySelector(".ql-editor").innerHTML;
			console.log(el2)
		},
	},
	// mounted () {
		// this.$refs.editor.setContents("<h1>hola</h1><br><h2>hai</h2>");
	// }
};
</script>
