import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000/';
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const auth = {
    me: () => client.get('/auth/me').then(r => r.data),
    login: (email, password) => client.post('/auth/login', { email, password }).then(r => r.data),
    register: (email, password) => client.post('/auth/register', { email, password }).then(r => r.data),
    logout: () => client.post('/auth/logout').then(r => r.data),
};

export const news = {
    categories: () => client.get('/api/news').then(r => r.data),
    getCategory: (cat, q, limit) => client.get(`/api/news/${encodeURIComponent(cat)}`, { params: {q, limit} }).then(r => r.data) 
};

export const saved = {
    list: () => client.get('/api/saved').then(r => r.data),
    save: (article) => client.post('/api/saved', { article }).then(r => r.data),
    remove: (url) => client.delete('/api/saved', { data: { url } }).then(r => r.data)
};