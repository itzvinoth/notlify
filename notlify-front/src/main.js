import { createApp } from "vue";
import VueFeather from 'vue-feather';
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);

app.use(store);

app.mount("#app");

app.component(VueFeather.name, VueFeather);
