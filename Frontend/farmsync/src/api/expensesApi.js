import { apiDelete, apiGet, apiPost, apiPut } from './apiClient';

// Get all expenses by cropId
export const getExpenses = async (cropId) => {
  if (!cropId) return [];
  return await apiGet(`/api/v1/expenses/crop/${cropId}`);
};

// Add a new expense
export const addExpenseApi = async (expense) => {
  return await apiPost('/api/v1/expenses', {
    category: expense.title,       // frontend uses "title", backend uses "category"
    amount: Number(expense.amount),
    description: expense.title,
    date: expense.date,
    cropId: Number(expense.crop),  // frontend sends crop name
  });
};

// Delete an expense
export const deleteExpenseApi = async (id) => {
  return await apiDelete(`/api/v1/expenses/${id}`);
};

// Update an expense
export const updateExpenseApi = async (id, expense) => {
  return await apiPut(`/api/v1/expenses/${id}`, {
    category: expense.category,
    amount: Number(expense.amount),
    description: expense.description,
    date: expense.date,
    cropId: expense.cropId,
  });
};