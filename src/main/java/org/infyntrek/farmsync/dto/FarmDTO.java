package org.infyntrek.farmsync.dto;

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
	private String farmName;
	private String location;
	private Double areaSize;
	private Long userId;
}
