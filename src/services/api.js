import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})
api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error.response.data);
});
export default api;