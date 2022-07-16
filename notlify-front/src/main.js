import { createApp } from "vue";
import VueFeather from 'vue-feather';
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);

app.use(store);

// app.directive('click-outside', {
// 	mounted: function (el, binding, vnode) {
// 		window.event = function (event) {
// 			// here I check that click was outside the el and his childrens
// 			if (!(el == event.target || el.contains(event.target))) {
// 				// and if it did, call method provided in attribute value
// 				vnode.context[binding.expression](event)
// 			}
// 		}
// 		document.body.addEventListener('click', window.event)
// 	},
// 	unmounted: function (el) {
// 		document.body.removeEventListener('click', window.event)
// 	}
// })

app.directive('click-outside', {
	mounted(el, binding, vnode) {
	el.clickOutsideEvent = function(event) {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event, el);
			}
	  	};
		document.body.addEventListener('click', el.clickOutsideEvent);
	},
	unmounted(el) {
		document.body.removeEventListener('click', el.clickOutsideEvent);
	}
});

app.directive('on-escape', {
	beforeMount: function (el, binding, vnode) {
		el.customEventKeydown = function (event) {
			if (event.keyCode === 27) {
				vnode.context[binding.expression](event)
			}
		}
		document.body.addEventListener('keydown', el.customEventKeydown)
	},
	beforeUnmount: function (el) {
		document.body.removeEventListener('keydown', el.customEventKeydown)
	}
})

app.directive('resize', {
	inserted: function(el, binding) {
		const onResizeCallback = binding.value
		window.addEventListener('resize', () => {
			const width = document.documentElement.clientWidth;
			const height = document.documentElement.clientHeight;
			onResizeCallback({ width, height })
		})
	}
})

app.mount("#app");

app.component(VueFeather.name, VueFeather);
