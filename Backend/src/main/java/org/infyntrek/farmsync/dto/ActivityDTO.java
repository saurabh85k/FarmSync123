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
public class ActivityDTO {

	private Long activityId;
	
	@NotBlank(message = "Activity type is required")
	private String activityType;
	
	private String description;
	
	@NotNull(message = "Date is required")
	private LocalDate date;
	
	private Long cropId;
}
