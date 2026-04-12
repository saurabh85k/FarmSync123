package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.ActivityDTO;
import org.infyntrek.farmsync.entity.Activity;
import org.infyntrek.farmsync.entity.Crop;
import org.infyntrek.farmsync.exception.ResourceNotFoundException;
import org.infyntrek.farmsync.mapper.ActivityMapper;
import org.infyntrek.farmsync.repository.ActivityRepository;
import org.infyntrek.farmsync.repository.CropRepository;
import org.infyntrek.farmsync.service.ActivityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
	
	private final ActivityRepository activityRepository;
	private final ActivityMapper activityMapper;
	private final CropRepository cropRepository;

	@Override
	public ActivityDTO createActivity(ActivityDTO activityDTO) {
	    Activity activity = activityMapper.toEntity(activityDTO);

	    if (activityDTO.getCropId() != null) {
	        Crop crop = cropRepository.findById(activityDTO.getCropId())
	                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + activityDTO.getCropId()));
	        activity.setCrop(crop);
	    }

	    return activityMapper.toDTO(activityRepository.save(activity));
	}

	@Override
	public ActivityDTO getActivityById(Long activityId) {
		Activity activity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		return activityMapper.toDTO(activity);
	}

	@Override
	public List<ActivityDTO> getActivitiesByCropId(Long cropId) {
		List<Activity> activities = activityRepository.findByCropCropId(cropId);
		
		return activities.stream()
				.map(activityMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public ActivityDTO updateActivity(Long activityId, ActivityDTO activityDTO) {
		Activity existingActivity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		existingActivity.setActivityType(activityDTO.getActivityType());
		existingActivity.setDate(activityDTO.getDate());
		existingActivity.setDescription(activityDTO.getDescription());
		
		// update activity if needed
		if(activityDTO.getCropId() != null) {
			Crop crop = cropRepository.findById(activityDTO.getCropId())
					.orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + activityDTO.getCropId()));
			
			existingActivity.setCrop(crop);
		}
		
		Activity updatedActivity = activityRepository.save(existingActivity);
		
		return activityMapper.toDTO(updatedActivity);
	}

	@Override
	@Transactional
	public void deleteActivity(Long activityId) {
		Activity activity = activityRepository.findById(activityId)
				.orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
		
		activityRepository.delete(activity);
	}

}
