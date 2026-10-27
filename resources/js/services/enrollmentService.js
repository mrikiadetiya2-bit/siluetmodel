import { api } from './api.js';

export const enrollmentService = {
    create: (programId) => api('/api/enrollments', { method: 'POST', body: JSON.stringify({ program_id: Number(programId) }) }),
};