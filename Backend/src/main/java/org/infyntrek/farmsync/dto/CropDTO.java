package org.infyntrek.farmsync.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CropDTO {

	private Long cropId;
	
	@NotBlank(message = "Crop name is required")
	private String cropName;
	
	@NotBlank(message = "Season is required")
	private String season;
	
	@NotNull(message = "Sowing date is required")
	private LocalDate sowingDate;
	
	@NotNull(message = "Expected harvest is required")
	private LocalDate expectedHarvest;
	private Long farmId;
}
