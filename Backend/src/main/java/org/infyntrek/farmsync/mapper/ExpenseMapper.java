package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.ExpenseDTO;
import org.infyntrek.farmsync.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

	public ExpenseDTO toDTO(Expense expense) {
		if(expense == null) {
			return null;
		}
		
		return ExpenseDTO.builder()
				.expenseId(expense.getExpenseId())
				.category(expense.getCategory())
				.amount(expense.getAmount())
				.description(expense.getDescription())
				.date(expense.getDate())
				.cropId(expense.getCrop() != null ? expense.getCrop().getCropId() : null)
				.build();
	}
	
	public Expense toEntity(ExpenseDTO expenseDTO) {
		if(expenseDTO == null) {
			return null;
		}
		
		Expense expense = new Expense();
		
		expense.setExpenseId(expenseDTO.getExpenseId());
		expense.setCategory(expenseDTO.getCategory());
		expense.setAmount(expenseDTO.getAmount());
		expense.setDescription(expenseDTO.getDescription());
		expense.setDate(expenseDTO.getDate());
		
		return expense;
	}
}
