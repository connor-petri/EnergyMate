import axios from 'axios';
import config from './config.json';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:' + config.BACKEND_PORT
})
axiosInstance.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    response => {
        // console.log("response = ", response)
        return response.data;
    },
    error => {
        // if (error.response.status === 403) {
        //     window.localStorage.removeItem('userinfo');
        //     window.location.href = '/signIn';
        // }
        if (!error.config.noAlert) {
            // console.log("error = ", error.config)
            alert(error.response.data.error)
        }
        return Promise.reject(error)
    }
)
export default axiosInstance;