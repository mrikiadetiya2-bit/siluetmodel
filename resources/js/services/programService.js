import { api } from './api.js';

export const programService = {
    publicList: () => api('/api/programs'),
    list: () => api('/api/admin/programs'),
    detail: (id) => api(`/api/programs/${encodeURIComponent(id)}`),
    create: (data) => api('/api/admin/programs', { method: 'POST', body: data }),
    update: (id, data) => {
        data.append('_method', 'PUT');
        return api(`/api/admin/programs/${encodeURIComponent(id)}`, { method: 'POST', body: data });
    },
    remove: (id) => api(`/api/admin/programs/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};