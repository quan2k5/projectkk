import axios from "axios";
export const getAllQuestions=async()=>{
    const response=await axios.get(`http://localhost:3000/question`);
    return response.data;
}
export const getFilterQuestions=async(string)=>{
    const response=await axios.get(`http://localhost:3000/question?${string}`);
    console.log()
    return response.data;
}
