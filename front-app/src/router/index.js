// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/LayoutPage.vue';
import Login from '@/components/LoginPage.vue';
import Reservations from '@/components/ReservationPage.vue';
import HomePage from '@/components/HomePage.vue';

const routes = [
    { path: '/login', component: Login }, // Route indépendante pour la connexion
    {
        path: '/',
        component: Layout,
        children: [
            { path: 'home', name: 'Home', component: HomePage },
            { path: 'reservations', component: Reservations },
        ],
    },
   // { path: '/', redirect: '/login' }, // Redirection par défaut vers la connexion
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
