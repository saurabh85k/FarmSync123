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
public class ActivityDTO {

	private Long activityId;
	private String activityType;
	private String description;
	private LocalDate date;
	private Long cropId;
}
