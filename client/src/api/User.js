import axios from "axios";
export const getAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);  
    } catch (error) {
        console.log('lỗi');  
      throw error; 
    }
  };
export const getFilterUsers=async(string)=>{
    const response = await axios.get(`http://localhost:3000/users?${string}`);
    console.log(`http://localhost:3000/users?${string}`);
    return response.data;
}
export const updateUsers=async(payload)=>{
    const response=await axios.patch(`http://localhost:3000/users/${payload.id}`,payload)
}