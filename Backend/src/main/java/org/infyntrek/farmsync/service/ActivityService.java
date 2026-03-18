package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.ActivityDTO;

public interface ActivityService {

	ActivityDTO createActivity(ActivityDTO activityDTO);
	
	ActivityDTO getActivityById(Long activityId);
	
	List<ActivityDTO> getActivitiesByCropId(Long cropId);
	
	ActivityDTO updateActivity(Long activityId, ActivityDTO activityDTO);
	
	void deleteActivity(Long activityId);
}
