import { createStore } from "vuex"
import questions from './module/question.module'
import users from "./module/user.module"
import courses from "./module/course.module"
const store = createStore({
    modules: {
        questions:questions,
        users:users,
        courses:courses,
    }
})
export default store