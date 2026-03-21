package org.infyntrek.farmsync.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpenseDTO {

	private Long expenseId;
	
	@NotBlank(message = "Category is required")
	private String category;
	
	@NotNull(message = "Amount is required")
	@Positive(message = "Amount must be positive")
	private Double amount;
	
	private String description;
	
	@NotNull(message = "Date is required")
	private LocalDate date;
	
	private Long cropId;
}
