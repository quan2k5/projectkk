import axios from "axios";
export const getAllCourses=async()=>{
    const response=await axios.get(`http://localhost:3000/courses`);
    return response.data;
}
export const deleteCourse=async(courseId) => {
    const response = await axios.delete(`http://localhost:3000/courses/${courseId}`);
};
export const createCourse = async (data) => {
    const response = await axios.post('http://localhost:3000/courses',data);
};
