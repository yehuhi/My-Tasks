import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        meta: {authNotRequired: false},
        beforeEach: async (to, from, next) => {
            if (!window.user) {
                await to('/')
            } else if (window.user) {
                await next('/calendar-month')
            }
            next();
        }
    },
    {
        path: '/calendar-month',
        name: 'Calendar_month',
        component: () => import('../views/Calendar_month.vue'),
        meta: {authNotRequired: false}
    },
    {
        path: '/calendar-daily',
        name: 'Calendar-daily',
        component: () => import('../components/Daily'),
        meta: {authNotRequired: false}
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../components/Profile'),
        meta: {authNotRequired: false}
    }
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router
