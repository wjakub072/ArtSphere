import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5006/api/auth',
    withCredentials: true,
});

export default instance;