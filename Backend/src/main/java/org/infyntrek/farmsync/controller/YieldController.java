package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.YieldDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.YieldService;
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
@RequestMapping("api/v1.0/yields")
public class YieldController {

	private final YieldService yieldService;
	
	@PostMapping
	public ResponseEntity<YieldDTO> createYield(@RequestBody YieldDTO yieldDTO) {
		return ResponseEntity.ok(yieldService.createYield(yieldDTO));
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
	public ResponseEntity<YieldDTO> updateYield(@PathVariable Long id, @RequestBody YieldDTO yieldDTO) {
		return ResponseEntity.ok(yieldService.updateYield(id, yieldDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteYield(@PathVariable Long id) {
		yieldService.deleteYield(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(new ApiResponse("Yield deleted successfully", true));
	}
}
