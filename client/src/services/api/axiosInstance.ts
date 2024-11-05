import axios from 'axios';

const axiosInstance=axios.create({
    baseURL:"http://localhost:8091"
})

export function setAuthToken(token:string){
    
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(token);
    
}

export default axiosInstance;