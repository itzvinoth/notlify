<template>
	<div>
		<quill-editor
			theme="snow"
			ref="editor"
			content-type="html"
			@ready="onReady()"
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
			content: ""
		}
	},
	computed: {
		cardDescription () {
			return this.cardDetail && this.cardDetail.description;
		}
	},
	methods: {
		onReady() {
			let cardDescription = this.cardDetail && this.cardDetail.description;
			this.$refs.editor.setContents(cardDescription.content);
		},
		onblur(event) {
			let el = event.value;
			let value = el.querySelector(".ql-editor").innerHTML;
			this.onUpdateCardDescription(value)
		},
		onUpdateCardDescription(value) {
			let description = {
				"content": value
			};
			let detail = {
				cardId: this.cardId,
				description,
			};
			this.$store.dispatch("kanban/updateCardDescription", detail);
		},
	},
	// mounted () {
		// this.$refs.editor.setContents("<h1>hola</h1><br><h2>hai</h2>");
	// }
};
</script>
