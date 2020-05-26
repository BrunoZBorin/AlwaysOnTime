import axios from 'axios';

const api = axios.create({
    baseURL:'http://191.234.164.127:8080/'
});

export default api;
    