package org.infyntrek.farmsync.dto;

import java.time.LocalDate;

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
	private String category;
	private Double amount;
	private String description;
	private LocalDate date;
	private Long cropId;
}
