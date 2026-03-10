package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.ExpenseDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1.0/expenses")
public class ExpenseController {

	private final ExpenseService expenseService;
	
	@PostMapping
	public ResponseEntity<ExpenseDTO> createExpense(@RequestBody ExpenseDTO expenseDTO) {
		return ResponseEntity.ok(expenseService.createExpense(expenseDTO));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ExpenseDTO> getExpenseById(@PathVariable Long id) {
		return ResponseEntity.ok(expenseService.getExpenseById(id));
	}
	
	@GetMapping("/crop/{cropId}")
	public ResponseEntity<List<ExpenseDTO>> getExpensesByCropId(@PathVariable Long cropId) {
		return ResponseEntity.ok(expenseService.getExpensesByCropId(cropId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ExpenseDTO> updateExpense(@PathVariable Long id, @RequestBody ExpenseDTO expenseDTO) {
		return ResponseEntity.ok(expenseService.updateExpense(id, expenseDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteExpense(@PathVariable Long id) {
		expenseService.deleteExpense(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Expense deleted successfully", true));
	}
}
