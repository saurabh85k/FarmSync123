// This lightweight API wrapper stores expense data in localStorage for demos.

const STORAGE_KEY = "expenses_data";

// Read the full expense list from browser storage.
export const getExpenses = async () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return data;
};

// Save a new expense and normalize numeric fields before storing.
export const addExpenseApi = async (expense) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newExpense = {
    id: Date.now(),
    ...expense,
    amount: Number(expense.amount),
  };

  const updated = [newExpense, ...data];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newExpense;
};

// Delete one expense entry by id.
export const deleteExpenseApi = async (id) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updated = data.filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return true;
};
