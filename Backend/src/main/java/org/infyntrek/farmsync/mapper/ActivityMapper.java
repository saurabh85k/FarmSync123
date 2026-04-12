package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.ActivityDTO;
import org.infyntrek.farmsync.entity.Activity;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {

	public ActivityDTO toDTO(Activity activity) {
		if(activity == null) {
			return null;
		}
		
		return ActivityDTO.builder()
				.activityId(activity.getActivityId())
				.activityType(activity.getActivityType())
				.description(activity.getDescription())
				.date(activity.getDate())
				.cropId(activity.getCrop() != null ? activity.getCrop().getCropId() : null)
				.build();
	}
	
	public Activity toEntity(ActivityDTO activityDTO) {
		if(activityDTO == null) {
			return null;
		}
		
		Activity activity = new Activity();
		
		activity.setActivityId(activityDTO.getActivityId());
		activity.setActivityType(activityDTO.getActivityType());
		activity.setDescription(activityDTO.getDescription());
		activity.setDate(activityDTO.getDate());
		
		return activity;
	}
}
