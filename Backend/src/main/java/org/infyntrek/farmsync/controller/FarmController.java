package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.FarmDTO;
import org.infyntrek.farmsync.entity.User;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.FarmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/farms")
public class FarmController {

	private final FarmService farmService;
	
	@PostMapping
	public ResponseEntity<FarmDTO> createFarm(@Valid @RequestBody FarmDTO farmDTO) {
		FarmDTO createdFarm = farmService.createFarm(farmDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdFarm);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<FarmDTO> getFarmById(@PathVariable Long id) {
		return ResponseEntity.ok(farmService.getFarmById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<FarmDTO>> getAllFarms() {
		return ResponseEntity.ok(farmService.getAllFarms());
	}
	
	/**
     * Returns only the farms belonging to the currently authenticated user.
     * Reads user ID from the JWT principal so no user can query another user's farms.
     */
    @GetMapping("/my")
    public ResponseEntity<List<FarmDTO>> getMyFarms(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(farmService.getFarmsByUserId(currentUser.getId()));
    }

    /**
     * Kept for ADMIN use only — regular users should use /my instead.
     */
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<FarmDTO>> getFarmsByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(farmService.getFarmsByUserId(userId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<FarmDTO> updateFarm(@PathVariable Long id, @Valid @RequestBody FarmDTO farmDTO) {
		return ResponseEntity.ok(farmService.updateFarm(id, farmDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteFarm(@PathVariable Long id) {
		farmService.deleteFarm(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(
				new ApiResponse("Farm deleted successfully", true)
		);
	}
}
