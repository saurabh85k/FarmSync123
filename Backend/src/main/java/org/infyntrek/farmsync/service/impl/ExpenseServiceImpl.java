package org.infyntrek.farmsync.service.impl;

import java.util.List;

import org.infyntrek.farmsync.dto.ExpenseDTO;
import org.infyntrek.farmsync.service.ExpenseService;
import org.springframework.stereotype.Service;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Override
	public ExpenseDTO createExpense(ExpenseDTO expenseDTO) {
		return null;
	}

	@Override
	public ExpenseDTO getExpenseById(Long expenseId) {
		return null;
	}

	@Override
	public List<ExpenseDTO> getExpensesByCropId(Long cropId) {
		return null;
	}

	@Override
	public ExpenseDTO updateExpense(Long expenseId, ExpenseDTO expenseDTO) {
		return null;
	}

	@Override
	public void deleteExpense(Long expenseId) {
		
	}

}
