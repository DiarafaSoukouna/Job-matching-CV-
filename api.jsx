import axios from "axios";

export const API_URL = 'https://cors-proxy.fringe.zone/http://ns4g4swo404kgsg44w4s80gc.194.163.163.190.sslip.io/job/';
export const fetchCategories = async () => {
    try {
        const response = await axios.get(API_URL+'/category/all');
        return response.data;
        
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
        
    }
}
export const addJobs = async (data) => {
    try {
        const response = await axios.post(API_URL+'create', data);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
}