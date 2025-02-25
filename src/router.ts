import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue";
import Episode from "./views/EpisodePage.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/episode/:id", component: Episode },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
