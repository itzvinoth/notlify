<template>
	<div class="kb__column--cards">
		<drop-zone :dragging-elem-height="draggingElemHeight" />
		<div class="kb-card__container" v-for="card in cards" :key="card.id" :data-id="card.id">
			<div class="kb__card" draggable="true" @click.self="onCardClick(card)" @dragstart="onDragStart($event, card.id)" @dragend="onDragEnd" @drag="onDrag" @dragenter.prevent @dragover.prevent>
				{{ card.title }}
				<popover>
					<template #trigger>
						<vue-feather type="more-horizontal" @click.prevent.stop="showCardMenu($event, card.id)"></vue-feather>
					</template>
					<template #body>
						<card-dropdown v-if="card.id === cardId" :pos="'right'" v-click-outside="onClickingOutside" :on-window-resize="'adjustable'">
							<template #title></template>
							<template #list>
								<li><a href="" @click.prevent>Edit</a></li>
								<li><a href="" @click.prevent @dblclick="onDblClick($event, card.id)">Delete</a></li>
							</template>
						</card-dropdown>
					</template>
				</popover>
			</div>
			<drop-zone :cardId="card.id" :dragging-elem-height="draggingElemHeight" />
		</div>
		<card-modal :show="showModal" :card-detail="cardDetail" @update="onUpdate" />
	</div>
</template>

<script>
import DropZone from "@/components/kanban/DropZone.vue";
import KanbanApi from "../../api/index"
import CardDropdown from "@/components/kanban/CardDropdown.vue";
import Popover from "@/components/Popover.vue";
import Modal from "@/components/Modal.vue";
import CardModal from "@/components/kanban/CardModal.vue";

import { mapGetters, mapActions } from 'vuex';

let draggingEle;
let isDraggingStarted = false;
let x = 0;
let y = 0;
let rect;
let count = 0;

export default {
	name: 'card',
	components: {
		'drop-zone': DropZone,
		'card-dropdown': CardDropdown,
		'popover': Popover,
		'card-modal': CardModal,
		Modal
	},
	props: {
		cards: {
			type: Object
		},
		columnId: {
			type: Number
		}
	},
	data() {
		return {
			content: '',
			draggingElemHeight: 0,
			showModal: false,
			cardDetail: null
		}
	},
	computed: {
		...mapGetters('kanban', {
			cardId: 'cardId'
		})
	},
	methods: {
		onUpdate () {
			this.showModal = false
		},
		onClickingOutside () {
			if (this.cardId !== null) {
				this.$store.dispatch('kanban/getCardId', null)
				return
			}
		},
		showCardMenu (event, id) {
			if (this.cardId === id) {
				this.$store.dispatch('kanban/getCardId', null)
				return
			}
			this.$store.dispatch('kanban/getCardId', id)
		},
		onDragStart (event, id) {
			draggingEle = event.target
			// const draggingRect = draggingEle.getBoundingClientRect()
			// this.draggingElemHeight = draggingRect.height
			event.target.style.opacity = '0.4'
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.setData('text/plain', id)
			
			rect = draggingEle.getBoundingClientRect()
			x = event.pageX - rect.left
			y = event.pageY - rect.top
			// document.addEventListener('mousemove', this.mouseMoveHandler);

			// draggingEle.querySelector('.kb__card--input').style.display = 'none'
			// draggingEle.querySelector('.kb__card--input').classList.add('placeholder')
			// draggingEle.querySelector('.kb__dropzone').style.height = `${rect.height - 10}px`
		},
		onDragEnd (event) {
			event.target.style.opacity = '1'
		},
		onDrag (event) {
			const draggingRect = draggingEle.getBoundingClientRect()
			this.$store.dispatch('kanban/getDraggingElemHeight', draggingRect.height)
			// this.draggingElemHeight = draggingRect.height
			// draggingEle.style.position = 'absolute'
			// draggingEle.style.width = '190px'
			// draggingEle.style.top = `${event.pageY - y}px`
			// draggingEle.style.left = `${event.pageX - x}px`
			// draggingEle.parentNode.querySelector('.kb__dropzone').classList.add('placeholder')
			// draggingEle.parentNode.querySelector('.kb__dropzone').style.height = `${rect.height}px`
		},
		onBlur (event, id) {
			let newContent = event.target.textContent.trim()

			if (newContent === this.content) {
				return
			}
			KanbanApi.updateCard(id, {
				'title': newContent
			});
		},
		onDblClick (event, id) {
			let check = confirm('Are you sure you want to delete this card')
			if (check) {
				this.onDeleteCard(id)
			}
		},
		onDeleteCard (id) {
			KanbanApi.deleteCard(id)
			// vuex commit update kanban
			this.$store.dispatch('kanban/getColumns')
		},
		onCardClick (card) {
			this.showModal = true
			this.cardDetail = card
		}
		// addCard (id) {
		// 	let newCard = {
		// 		id: this.lists[key].length,
		// 		title: this.lists[key]['newCard']
		// 	}
		// 	this.lists[key]['cards'].push(newCard)
		// 	this.resetting(key)
		// }
	},
}
</script>