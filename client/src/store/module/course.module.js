import { getAllCourses,deleteCourse } from "@/api/Course";
const course={
    state:{
       courses:[],
    },
    mutations:{
        setCourse:(state,payload)=>{
            state.courses=[];
            state.courses=payload;
        }
    },
    actions:{
        getCourses:async({commit},payload)=>{
            const courses=await getAllCourses(payload);
            commit('setCourse',courses);
        },
        deleteCourse:async({commit},payload)=>{
            await deleteCourse(payload);
            const courses=await getAllCourses();
            commit('setCourse',courses);
        }
    }
}
export default course;
