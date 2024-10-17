import { getAllQuestions,getFilterQuestions } from "@/api/Question";
const questions={
    state:{
       questions:[],
       allQuestions:[],
    },
    mutations:{
        getAllQuestionsInTest:(state)=>{
            state.allQuestions=getFilterQuestions();
        },
        getFilterQuestions:(state)=>{
            state.questions=getFilterQuestions();
        }
    },
    actions:{
        getAllQuestionsInTest:({commit},payload)=>{
            commit('getAllQuestionsIntest',payload);
        },
        getFilterQuestions:({commit},payload)=>{
            commit('getFilterQuestions',payload);
        }
    }
}
export default questions;