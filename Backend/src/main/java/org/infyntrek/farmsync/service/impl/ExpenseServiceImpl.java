package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.ExpenseDTO;
import org.infyntrek.farmsync.entity.Crop;
import org.infyntrek.farmsync.entity.Expense;
import org.infyntrek.farmsync.mapper.ExpenseMapper;
import org.infyntrek.farmsync.repository.CropRepository;
import org.infyntrek.farmsync.repository.ExpenseRepository;
import org.infyntrek.farmsync.service.ExpenseService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
	
	private final ExpenseRepository expenseRepository;
	private final ExpenseMapper expenseMapper;
	private final CropRepository  cropRepository;

	@Override
	public ExpenseDTO createExpense(ExpenseDTO expenseDTO) {
		Expense expense = expenseMapper.toEntity(expenseDTO);
		Expense savedExpense = expenseRepository.save(expense);
		
		return expenseMapper.toDTO(savedExpense);
	}

	@Override
	public ExpenseDTO getExpenseById(Long expenseId) {
		Expense expense = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new RuntimeException("Expense not found with id: " + expenseId));
		
		return expenseMapper.toDTO(expense);
	}

	@Override
	public List<ExpenseDTO> getExpensesByCropId(Long cropId) {
		List<Expense> expenses = expenseRepository.findByCropCropId(cropId);
		
		return expenses.stream()
				.map(expenseMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public ExpenseDTO updateExpense(Long expenseId, ExpenseDTO expenseDTO) {
		Expense existingExpense = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new RuntimeException("Expense not found with id: " + expenseId));
		
		existingExpense.setAmount(expenseDTO.getAmount());
		existingExpense.setCategory(expenseDTO.getCategory());
		existingExpense.setDescription(expenseDTO.getDescription());
		existingExpense.setDate(expenseDTO.getDate());
		
		// update crop if needed
		if(expenseDTO.getCropId() != null) {
			Crop crop = cropRepository.findById(expenseDTO.getCropId())
					.orElseThrow(() -> new RuntimeException("Crop not found with id: " + expenseDTO.getCropId()));
			
			existingExpense.setCrop(crop);
		}
		
		Expense updatedExpense = expenseRepository.save(existingExpense);
		
		return expenseMapper.toDTO(updatedExpense);
	}

	@Override
	public void deleteExpense(Long expenseId) {
		Expense expense = expenseRepository.findById(expenseId)
				.orElseThrow(() -> new RuntimeException("Expense not found with id: " + expenseId));
		
		expenseRepository.delete(expense);
	}

}
