package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.CropDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.CropService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("api/v1.0/crops")
public class CropController {

	private final CropService cropService;
	
	@PostMapping
	public ResponseEntity<CropDTO> createCrop(@Valid @RequestBody CropDTO cropDTO) {
		CropDTO createdCrop = cropService.createCrop(cropDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCrop);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CropDTO> getCropById(@PathVariable Long id) {
		return ResponseEntity.ok(cropService.getCropById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<CropDTO>> getAllCrops() {
		return ResponseEntity.ok(cropService.getAllCrops());
	}
	
	@GetMapping("/farm/{farmId}")
	public ResponseEntity<List<CropDTO>> getCropsByFarmId(@PathVariable Long farmId) {
		return ResponseEntity.ok(cropService.getCropsByFarmId(farmId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CropDTO> updateCrop(@PathVariable Long id, @Valid @RequestBody CropDTO cropDTO) {
		return ResponseEntity.ok(cropService.updateCrop(id, cropDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteCrop(@PathVariable Long id) {
		cropService.deleteCrop(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Crop deleted successfully", true));
	}
}
