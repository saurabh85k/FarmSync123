package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.YieldDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.YieldService;
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
@RequestMapping("api/v1.0/yields")
public class YieldController {

	private final YieldService yieldService;
	
	@PostMapping
	public ResponseEntity<YieldDTO> createYield(@Valid @RequestBody YieldDTO yieldDTO) {
		YieldDTO createdYield = yieldService.createYield(yieldDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdYield);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<YieldDTO> getYieldById(@PathVariable Long id) {
		return ResponseEntity.ok(yieldService.getYieldById(id));
	}
	
	@GetMapping("/crop/{cropId}")
	public ResponseEntity<List<YieldDTO>> getYieldsByCropId(@PathVariable Long cropId) {
		return ResponseEntity.ok(yieldService.getYieldsByCropId(cropId));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<YieldDTO> updateYield(@PathVariable Long id, @Valid @RequestBody YieldDTO yieldDTO) {
		return ResponseEntity.ok(yieldService.updateYield(id, yieldDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteYield(@PathVariable Long id) {
		yieldService.deleteYield(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Yield deleted successfully", true));
	}
}
