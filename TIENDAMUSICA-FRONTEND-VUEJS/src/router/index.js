import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: () => import('../views/Inicio')
    },
    {
        path: '/empleados',
        name: 'Empleados',
        component: () => import('../views/Empleados')
    },
    {
        path:'*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;