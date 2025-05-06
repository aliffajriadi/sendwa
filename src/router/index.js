import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Broadcast from "../views/Broadcast.vue"
import Confess from "../views/Confess.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/broadcast', name: 'Broadcast', component: Broadcast},
    {path: '/confess', name: 'Confess', component: Confess},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;