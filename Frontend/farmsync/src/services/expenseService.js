import API from './api';

export const expenseService = {
  getAll: () => API.get('/expenses'),
  getById: (id) => API.get(`/expenses/${id}`),
  create: (data) => API.post('/expenses', data),
  update: (id, data) => API.put(`/expenses/${id}`, data),
  delete: (id) => API.delete(`/expenses/${id}`),
};