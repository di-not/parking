import axios from "axios";
export const API_URL = "http://localhost:8000";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
			if (typeof window !== 'undefined') { 
				window.location.href = '/admin/login'; 
			  }
        }
        return Promise.reject(error);
    }
);

export default $api;
