package org.infyntrek.farmsync.controller;

import java.util.List;

import org.infyntrek.farmsync.dto.FarmUserDTO;
import org.infyntrek.farmsync.response.ApiResponse;
import org.infyntrek.farmsync.service.FarmUserService;
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
@RequestMapping("api/v1/users")
public class FarmUserController {

	private final FarmUserService farmUserService;
	
	@PostMapping
	public ResponseEntity<FarmUserDTO> createUser(@Valid @RequestBody FarmUserDTO userDTO) {
		FarmUserDTO createdUser = farmUserService.createUser(userDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<FarmUserDTO> getUserById(@PathVariable Long id) {
		return ResponseEntity.ok(farmUserService.getUserById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<FarmUserDTO>> getAllUsers() {
		return ResponseEntity.ok(farmUserService.getAllUsers());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<FarmUserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody FarmUserDTO userDTO) {
		return ResponseEntity.ok(farmUserService.updateUser(id, userDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
		farmUserService.deleteUser(id);
//		return ResponseEntity.noContent().build();
		return ResponseEntity.ok(
				new ApiResponse("User deleted successfully", true)
		);
	}
}
