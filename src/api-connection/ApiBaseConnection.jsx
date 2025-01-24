import axios from 'axios';

const token = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: 'https://localhost:7069/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

    }
});

export default api;