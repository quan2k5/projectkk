import { createRouter, createWebHistory } from 'vue-router';
import LayoutAdmin from '../layouts/LayoutAdmin.vue';
import LoginAdmin from '../views/admin/Login.vue';
import adminUser from '../views/admin/adminUser.vue'
import adminCourse from '../views/admin/adminCourse.vue'
import adminSubject from '../views/admin/adminSubject.vue'
import adminExam from '../views/admin/adminExam.vue'
import adminQuestion from '@/views/admin/adminQuestion.vue';
import userLogin from '../views/auth/userLogin.vue'
import LayoutUser from '@/layouts/LayoutUser.vue';
import subjectUser from '@/views/user/subjectUser.vue';
import homeUser from '@/views/user/homeUser.vue';
import examUser from '@/views/user/examUser.vue';
import testExam from '@/views/user/testExam.vue';
import { useStore } from 'vuex';
import DetailExam from '@/views/user/detailExam.vue';
import profileUser from '@/views/user/profileUser.vue';
import { getAllUsers } from '@/api/User';
import userRegister from '@/views/auth/userRegister.vue';
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
            },
            {
                path:'subjects',
                name:'adminSubjects',
                component:adminSubject,
            },
            {
                path:'exams',
                name:'adminExams',
                component:adminExam,
            },
            {
                path:'questions/:id',
                name:'adminQuestions',
                component:adminQuestion
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
        path:'/',
        redirect:'/user'
    },
    {
        path: '/loginAdmin',
        name: 'loginAdmin',
        component: LoginAdmin,
    },
    {
        path:'/userLogin',
        name:'userLogin',
        component:userLogin,
    },
    {
        path:'/userRegister',
        name:'userRegister',
        component:userRegister
    },
    {
        path:'/user',
        name:'user',
        component:LayoutUser,
        children:[
            {
                path:'',
                name:"homeUser",
                component:homeUser,
            },
            {
                path:'subjectUser',
                name:"subjectUser",
                component:subjectUser,
            },
            {
                path:"examUser/:id",
                name:"examUser",
                component:examUser,

            },
            {
                path:"detailExam/:id",
                name:'detailExam',
                component:DetailExam
            },
            {
                path:"profileUser",
                name:"profileUser",
                component:profileUser
            },
        ]
    },
    {
        path:"/testExam/:id",
        name:"testExam",
        component:testExam,
        beforeEnter:async(to,from,next)=>{
            const user=await getAllUsers();
            let findUser=user.find((item)=>item.status==true);
            if(findUser){
                next();
            }else{
                next('/userLogin');
            }

        }
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
