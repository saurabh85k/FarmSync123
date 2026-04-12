import { apiGet, apiPost, apiDelete, apiPut } from './apiClient';

export const getExpensesByCrop = async (cropId) => {
  return await apiGet(`/api/v1/expenses/crop/${cropId}`);
};

export const createExpense = async (expense) => {
  return await apiPost('/api/v1/expenses', expense);
};

export const updateExpense = async (id, expense) => {
  return await apiPut(`/api/v1/expenses/${id}`, expense);
};

export const deleteExpense = async (id) => {
  return await apiDelete(`/api/v1/expenses/${id}`);
};