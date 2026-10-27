import { api } from './api.js';

export const authService = {
    login: (data) => api('/login', { method: 'POST', body: JSON.stringify(data) }),
    adminLogin: (data) => api('/admin/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data) => api('/register', { method: 'POST', body: JSON.stringify(data) }),
    dashboard: () => api('/portal/dashboard'),
};