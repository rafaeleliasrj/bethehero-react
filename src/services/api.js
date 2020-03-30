import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bethehero-node.herokuapp.com'
})

export default api;