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
public class YieldDTO {

	private Long yieldId;
	private Double quantity;
	private Double income;
	private LocalDate harvestDate;
	private Long cropId;
}
