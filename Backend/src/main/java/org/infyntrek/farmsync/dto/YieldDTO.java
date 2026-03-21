package org.infyntrek.farmsync.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class YieldDTO {

	private Long yieldId;
	
	@NotNull(message = "Quantity is required")
	private Double quantity;
	
	@NotNull(message = "Income is required")
	private Double income;
	
	@NotNull(message = "Harvest date is required")
	private LocalDate harvestDate;
	
	@NotNull(message = "Crop id is required")
	private Long cropId;
}
