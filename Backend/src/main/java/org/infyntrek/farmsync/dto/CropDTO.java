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
public class CropDTO {

	private Long cropId;
	private String cropName;
	private String season;
	private LocalDate sowingDate;
	private LocalDate expectedHarvest;
	private Long farmId;
}
