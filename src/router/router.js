import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Login.vue'
import Students from '../components/Student/Students.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import StudentDetail from '../components/Student/StudentDetail.vue'
import Profile from "../views/Profile.vue";

const isAuthenticated = () => {
    return !!localStorage.getItem('token')
}

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
                meta: { requiresGuest: true }
            }
        ]
    },
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: 'students',
                name: 'Students',
                component: Students,
                meta: { requiresAuth: true }
            },
            {
                path: 'students/:id',
                name: 'StudentDetail',
                component: StudentDetail,
                meta: { requiresAuth: true }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
                meta: { requiresAuth: true }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = isAuthenticated()

    if (to.meta.requiresAuth && !auth) {
        return next('/login')
    }

    if (to.meta.requiresGuest && auth) {
        return next('/students')
    }

    return next()
})

export default router