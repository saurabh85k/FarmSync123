package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.FarmUserDTO;

public interface FarmUserService {

	FarmUserDTO createUser(FarmUserDTO userDTO);
	
	FarmUserDTO getUserById(Long userId);
	
	List<FarmUserDTO> getAllUsers();
	
	FarmUserDTO updateUser(Long userId, FarmUserDTO userDTO);
	
	void deleteUser(Long userId);
}
