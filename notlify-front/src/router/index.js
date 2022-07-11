import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import KanbanView from "../views/KanbanView.vue"
import Popover from "../components/Popover.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
	  {
	    path: "/",
	    name: "home",
	    component: HomeView,
	  },
	  {
	    path: "/new",
	    name: "kanban",
	    component: KanbanView,
	  },
	  {
	    path: "/pop",
	    name: "Popover",
	    component: Popover,
	  },
	  {
	    path: "/about",
	    name: "about",
	    // route level code-splitting
	    // this generates a separate chunk (About.[hash].js) for this route
	    // which is lazy-loaded when the route is visited.
	    component: () => import("../views/AboutView.vue"),
	  },
	],
});

export default router;
