package org.infyntrek.farmsync.dto;

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
public class FarmDTO {

	private Long farmId;
	
	@NotBlank(message = "Farm name is required")
	private String farmName;
	
	@NotBlank(message = "Location is required")
	private String location;
	
	@NotNull(message = "Area size is required")
	private Double areaSize;
	private Long userId;
}
