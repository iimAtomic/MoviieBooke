// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage.vue';
import Reservations from '@/components/ReservationPage.vue';
import HomePage from "@/components/HomePage.vue";

const routes = [
    { path: '/', name:"Home", component: HomePage },
    { path: '/login', component: Login },
    { path: '/reservations', component: Reservations }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
