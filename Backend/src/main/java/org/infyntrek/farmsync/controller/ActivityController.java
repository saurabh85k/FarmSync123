package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.ActivityDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1.0/activities")
public class ActivityController {

	private final ActivityService activityService;
	
	@PostMapping
	public ResponseEntity<ActivityDTO> createActivity(@RequestBody ActivityDTO activityDTO) {
		return ResponseEntity.ok(activityService.createActivity(activityDTO));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ActivityDTO> getActivityById(@PathVariable Long id) {
		return ResponseEntity.ok(activityService.getActivityById(id));
	}
	
	@GetMapping("/crop/{cropId}")
	public ResponseEntity<List<ActivityDTO>> getActivitiesByCropId(@PathVariable Long cropId) {
		return ResponseEntity.ok(activityService.getActivitiesByCropId(cropId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ActivityDTO> updateActivity(@PathVariable Long id, @RequestBody ActivityDTO activityDTO) {
		return ResponseEntity.ok(activityService.updateActivity(id, activityDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteActivity(@PathVariable Long id) {
		activityService.deleteActivity(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Activity deleted successfully", true));
	}
}
