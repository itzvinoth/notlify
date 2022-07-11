<template>
	<div id="popover">{{ width }} x {{ height }}</div>
	<!--<popover> 
			<popover-trigger>
				<vue-feather type="more-horizontal" @click="showCardMenu($event, card.id)"></vue-feather>
			</popover-trigger>
			<popover-content>
				<card-dropdown v-if="card.id === cardId">
					<template #title></template>
					<template #list>
						<li><a href="" @click.prevent>Edit</a></li>
						<li><a href="" @click.prevent @dblclick="onDblClick($event, card.id)">Delete</a></li>
					</template>
				</card-dropdown>
			</popover-content>
		</popover>-->
</template>

<script>
export default {
  name: 'Popover',
	data () {
		return { width: window.innerWidth, height: window.innerHeight };
	},
	created() {
		window.addEventListener('resize', this.onResize);
	},
	destroyed() {
		window.removeEventListener('resize', this.onResize);
	},
	methods: {
		onResize (e) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		}
	}
};
</script>