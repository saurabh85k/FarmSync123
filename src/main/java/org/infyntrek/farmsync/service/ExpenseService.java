package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.ExpenseDTO;

public interface ExpenseService {

	ExpenseDTO createExpense(ExpenseDTO expenseDTO);
	
	ExpenseDTO getExpenseById(Long expenseId);
	
	List<ExpenseDTO> getExpensesByCropId(Long cropId);
	
	ExpenseDTO updateExpense(Long expenseId, ExpenseDTO expenseDTO);
	
	void deleteExpense(Long expenseId);
}
