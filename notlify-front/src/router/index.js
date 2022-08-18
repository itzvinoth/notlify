import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import BoardsView from '../views/Boards.vue';
import KanbanView from '../views/Kanban.vue';
import NotesView from '../components/kanban/Notes.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
	  {
	    path: '/',
	    name: 'home',
	    component: HomeView,
	  },
	  {
	    path: '/boards',
	    name: 'Boards',
	    component: BoardsView,
	  },
	  {
	    path: '/new',
	    name: 'kanban',
	    component: KanbanView,
	  },
	  {
	    path: '/notes',
	    name: 'notes',
	    component: NotesView,
	  },
	  {
	    path: '/about',
	    name: 'about',
	    // route level code-splitting
	    // this generates a separate chunk (About.[hash].js) for this route
	    // which is lazy-loaded when the route is visited.
	    component: () => import('../views/About.vue'),
	  },
	],
});

export default router;
