import API from './api';

export const cropService = {
    getAll: () => API.get('/crops'),
    getById: (id) => API.get(`/crops/${id}`),
    create: (data) => API.post('/crops', data),
    update: (id, data) => API.put(`/crops/${id}`, data),
    delete: (id) => API.delete(`/crops/${id}`),
};