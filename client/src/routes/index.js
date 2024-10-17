import { createRouter, createWebHistory } from 'vue-router';
import LayoutAdmin from '../layouts/LayoutAdmin.vue';
import LoginAdmin from '../views/admin/Login.vue';
import adminUser from '../views/admin/adminUser.vue'
import adminCourse from '../views/admin/adminCourse.vue'
import { useStore } from 'vuex';
const routes = [
    {
        path: '/admin',
        name: 'admin',
        component:LayoutAdmin,
        children:[
            {
                path:'users',
                name:'adminUsers',
                component:adminUser
            },
            {
                path:'courses',
                name:'admincourses',
                component:adminCourse
            }
        ],
        beforeEnter:async (to, from, next) => {
            const store=useStore();
            await store.dispatch('getAdmin'); 
            if (store.state.users.admin.status == false) {
                next('/loginAdmin'); 
            } else {
                next();
            }
        }

    },
    {
        path: '/loginAdmin',
        name: 'loginAdmin',
        component: LoginAdmin,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
