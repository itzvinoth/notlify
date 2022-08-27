<template>
	<div class="kb__columns">
		<div class="kb__column" v-for="column in columns" :key="column.id" :data-id="column.id">
			<popover>
				<template #trigger>
					<vue-feather type="more-horizontal" @click.prevent.stop="showColumnMenu($event, column.id)"></vue-feather>
				</template>
				<template #body>
					<card-dropdown v-if="column.id === columnId" :pos="'right'" v-click-outside="onClickingOutsideColumnMenu" :on-window-resize="'adjustable'">
						<template #title></template>
						<template #list>
							<li><a href="" @click.prevent>Edit</a></li>
							<li><a href="" @click.prevent @dblclick="onDblClickColumnDeleteMenu($event, column.id)">Delete</a></li>
						</template>
					</card-dropdown>
				</template>
			</popover>
			<div class="kb__column--title">
				{{ column.title }}
			</div>
			<card :cards="column.cards" :column-id="column.id" :column-title="column.title" />
			<!-- <button class="kb__add-item" type="button" @click="addCard(column.id)">Add a card</button> -->
			<div class="card-composer">
				<div v-if="column.id !== selectedColumnId" @click="cardComposer('add', column.id)" class="add-card">Add a card</div>
				<div v-if="isComposingNewCard && column.id === selectedColumnId">
					<textarea class="card-composer__textarea" v-model="newCardTitle" :ref="`cardtitle-${column.id}`"  @keypress.enter="cardComposer('save', column.id)" placeholder="Enter a card title" />
					<button @click="cardComposer('save', column.id)" class="save-card">Save</button>
				</div>
			</div>
		</div>
		<!-- <div class="kb__column" style="cursor: pointer;" @click="addColumn">
			<div>Add another column</div>
		</div> -->
		<div class="kb__column" style="cursor: pointer;">
			<div class="column-composer">
				<div v-if="!isComposingNewColumn" @click="columnComposer('add')" class="add-column">
					Add another column
				</div>
				<div v-if="isComposingNewColumn">
					<textarea class="column-composer__textarea" v-model="newColumnTitle" @keypress.enter="columnComposer('save')" placeholder="Enter a column title" />
					<button @click="columnComposer('save')" class="save-column">Save</button>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
import Card from '@/components/kanban/Card.vue';
import KanbanApi from '../../api/kanban/index';
import CardDropdown from '@/components/kanban/CardDropdown.vue';
import Popover from '@/components/Popover.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		'card': Card,
		'card-dropdown': CardDropdown,
		'popover': Popover,
	},
	data () {
		return {
			newColumnTitle: '',
			isComposingNewColumn: false,
			isComposingNewCard: false,
			newCardTitle: '',
			newCardId: null,
			selectedColumnId: null
		}
	},
	computed: {
		...mapGetters('kanban', {
			columnId: 'columnId',
			cardId: 'cardId',
			columns: 'columns'
		})
	},
	methods: {
		// addCard (id) {
		// 	let newCard = KanbanApi.insertCard(id, '')
		// 	// vuex commit update kanban
		// 	this.$store.dispatch('kanban/getColumns')
		// },
		cardComposer (type, columnId) {
			if (type === 'add') {
				this.selectedColumnId = columnId
				this.isComposingNewCard = true
				let newCardId = Math.floor(Math.random() * 100000)
				this.newCardId = newCardId
			} else if (type === 'save') {
				let id = this.newCardId
				KanbanApi.insertCard(columnId, id)
				KanbanApi.updateCard(id, {
					'title': this.newCardTitle,
					'checklist': []
				})
				// vuex commit update kanban
				this.$store.dispatch('kanban/getColumns')
				this.reset()
			}
		},
		reset () {
			this.newCardTitle = ''
			this.newCardId = null
			this.selectedColumnId = null
		},
		showColumnMenu (event, id) {
			if (this.columnId === id) {
				this.$store.dispatch('kanban/getColumnId', null)
				return
			}
			this.$store.dispatch('kanban/getColumnId', id)
		},
		onDblClickColumnDeleteMenu (event, id) {
			let check = confirm('Are you sure you want to delete this column')
			if (check) {
				this.onDeleteColumn(id)
			}
		},
		onDeleteColumn (id) {
			KanbanApi.deleteColumn(id)
			// vuex commit update kanban
			this.$store.dispatch('kanban/getColumns')
		},
		onClickingOutsideColumnMenu () {
			if (this.columnId !== null) {
				this.$store.dispatch('kanban/getColumnId', null)
				return
			}
		},
		addColumn () {
			const column = {
				'id': this.columns.length + 1,
				'title': this.newColumnTitle,
				'cards': []
			}
			KanbanApi.insertColumn(column)
			this.$store.dispatch('kanban/getColumns')
		},
		columnComposer (type) {
			if (type === 'add') {
				this.isComposingNewColumn = true
			} else if (type === 'save') {
				this.addColumn()
				this.isComposingNewColumn = false
			}
		}
	},
}
</script>